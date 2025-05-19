import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/AuthPage.module.css';

const AuthPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'login' : 'register';
    console.log("Sending:", { username, password });
    try {
      const res = await axios.post(`http://localhost:6500/api/auth/${endpoint}`, {
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
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} className={styles.switchButton}>
        Switch to {isLogin ? 'Register' : 'Login'}
      </button>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default AuthPage;