import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from '@react-oauth/google';
import styles from '../styles/AuthPage.module.css';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;

const AuthPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = isLogin ? 'login' : 'register';
    console.log("Sending:", { username, password });
    try {
      const res = await axios.post(`${API_BASE_URL}/${endpoint}`, {
        username, password
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('username', res.data.username);

      toast.success(`${isLogin ? 'Login' : 'Register'} successful`, { autoClose: 1000 });
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || err.response?.data?.error || 'Something went wrong', { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/google`, {
        credential: credentialResponse.credential
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('username', res.data.username);

      toast.success('Google Login successful', { autoClose: 1000 });
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (err) {
      toast.error('Google Auth Failed', { autoClose: 3000 });
    }
  };

  const handleGoogleError = () => {
    toast.error('Google login failed', { autoClose: 3000 });
  };

  return (
    <div className={styles.authContainer}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit" disabled={loading}>
          {loading ? <span className={styles.spinner}></span> : isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <div className={styles.divider}>
        <span>or</span>
      </div>

      <div className={styles.googleAuth}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap
        />
      </div>

      <button onClick={() => setIsLogin(!isLogin)} className={styles.switchButton}>
        {isLogin ? "Don't have an account? Switch to Register" : 'Already have an account? Switch to Login'}
      </button>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default AuthPage;