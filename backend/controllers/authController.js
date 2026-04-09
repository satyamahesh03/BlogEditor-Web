import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log("Registering user:", username);
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ token: generateToken(user._id), username: user.username, userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid Username or Password' });
    }
    res.json({ token: generateToken(user._id), username: user.username, userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const googleAuth = async (req, res) => {
  const { credential } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;
    
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.findOne({ googleId });
    }
    
    if (!user) {
      let baseUsername = name || email.split('@')[0];
      let uniqueUsername = baseUsername;
      let counter = 1;
      while (await User.findOne({ username: uniqueUsername })) {
        uniqueUsername = `${baseUsername}${counter}`;
        counter++;
      }
      user = new User({
        username: uniqueUsername,
        email,
        googleId,
        profilePicture: picture,
      });
      await user.save();
    } else if (!user.googleId) {
      user.googleId = googleId;
      if (picture && !user.profilePicture) user.profilePicture = picture;
      await user.save();
    }
    
    res.json({ token: generateToken(user._id), username: user.username, userId: user._id, profilePicture: user.profilePicture });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ error: 'Google Auth failed' });
  }
};