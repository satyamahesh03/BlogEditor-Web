

# Blog Editor Web App

A full-stack blog editor application built with the MERN stack (MongoDB, Express, React, Node.js). This app enables users to write, edit, save drafts, and publish blogs. Auto-saving drafts, user-specific access control, and JWT-based authentication are supported.

## 🌟 Features

- ✅ Register & Login with secure JWT authentication
- 📝 Create, edit, and delete your own blogs
- 💾 Auto-save drafts every 5 seconds after inactivity
- 📂 Drafts visible only to the creator
- 🌍 Published blogs visible to all users (view-only if not owner)
- 🔐 Only owners can edit or delete their blogs
- 🛎️ Toast notifications for user feedback

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Axios, React Toastify, CSS Modules
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas using Mongoose
- **Authentication**: JWT tokens stored in localStorage

## 📁 Project Structure

```
frontend/
│   ├── components/     # BlogEditor, BlogCard, etc.
│   ├── pages/          # AllBlogsPage, EditorPage, AuthPage, ProfilePage
│   ├── styles/         # CSS Modules
│   └── App.jsx         # Route configurations

backend/
│   ├── controllers/    # Blog and Auth logic
│   ├── middleware/     # JWT auth middleware
│   ├── models/         # Mongoose schemas for Blog and User
│   ├── routes/         # API routes
│   ├── config/         # MongoDB connection config
│   └── server.js       # Express server entry
```

## 🚀 Getting Started

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```
2. Install dependencies:
```bash
npm install
```
3. Add a `.env` file:
```
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
PORT=6500
```
4. Run the server:
```bash
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## 🔗 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST   | /api/auth/register | Register new user | ❌ |
| POST   | /api/auth/login    | Login user | ❌ |
| GET    | /api/blogs         | Get all blogs | ✅ |
| GET    | /api/blogs/:id     | Get blog by ID | ✅ |
| POST   | /api/blogs/save-draft | Save or update draft | ✅ |
| POST   | /api/blogs/publish | Publish blog | ✅ |
| DELETE | /api/blogs/:id     | Delete blog (owner only) | ✅ |

## 📌 License

This project is licensed under the MIT License.