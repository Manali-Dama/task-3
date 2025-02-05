'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, logout, loginSuccess } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.login);
  const router = useRouter();

  // Check if there's a user in localStorage after component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
          dispatch(loginSuccess({ user: storedUser, token: storedToken }));
        }
      } catch (error) {
        console.error("Error reading user data from localStorage:", error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      router.push('/'); // Redirect to the homepage after successful login
    }
  }, [user, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest({ email, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <div className="login-component">
      <h2>
        {user?.name || 'Guest'}
      </h2>
      {!user ? (
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
