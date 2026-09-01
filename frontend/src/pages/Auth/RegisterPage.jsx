// frontend/src/pages/Auth/RegisterPage.jsx
import React, { useState, useCallback } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  Alert, Box, Button, CircularProgress, Paper, 
  Stack, TextField, Typography, Link, Divider
} from '@mui/material';
import { UserPlus, Sparkles, Leaf, Recycle, Truck, Eye, EyeOff } from 'lucide-react';
import { 
  auth, 
  createUserWithEmailAndPassword,
  updateProfile
} from '../../config/firebase';
import { createUserDocument } from '../../utils/userHelpers';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = useCallback(event => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  const handleSubmit = useCallback(async event => {
    event.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      setFeedback({ type: 'error', message: 'Passwords do not match' });
      return;
    }

    if (form.password.length < 6) {
      setFeedback({ type: 'error', message: 'Password must be at least 6 characters' });
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        form.email, 
        form.password
      );
      
      const user = userCredential.user;
      
      await updateProfile(user, {
        displayName: form.name
      });

      await createUserDocument(user.uid, {
        name: form.name,
        email: form.email,
        role: form.role
      });

      setFeedback({ 
        type: 'success', 
        message: 'Registration successful! Please sign in.' 
      });
      
      setTimeout(() => {
        navigate('/login', { 
          state: { notice: 'Account created successfully. Please sign in.' } 
        });
      }, 2000);

    } catch (error) {
      console.error('Registration error:', error);
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please sign in instead.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please use a stronger password.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Email/password accounts are not enabled. Please contact support.';
      }
      
      setFeedback({ type: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  }, [form, navigate]);

  return (
    <div className="auth-container">
      {/* Left Side - Form */}
      <div className="auth-form-side">
        <div className="auth-form-wrapper">
          <div className="auth-brand">
            <div className="auth-logo">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <div className="auth-brand-name">JEMAK</div>
              <div className="auth-brand-subtitle">Waste Management</div>
            </div>
          </div>

          <div className="auth-header">
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Start managing waste collection efficiently</p>
          </div>

          {feedback && (
            <Alert 
              severity={feedback.type} 
              onClose={() => setFeedback(null)}
              className="auth-alert"
            >
              {feedback.message}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-form-group">
              <label className="auth-label">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
                autoFocus
                className="auth-input"
                placeholder="John Doe"
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="auth-input"
                placeholder="you@example.com"
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Password</label>
              <div className="auth-password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  className="auth-input auth-password-input"
                  placeholder="Min 6 characters"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="auth-eye-btn"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Confirm Password</label>
              <div className="auth-password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  className="auth-input auth-password-input"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="auth-eye-btn"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="auth-btn-primary"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
            </button>

            <p className="auth-footer-text">
              Already have an account?{' '}
              <Link component={RouterLink} to="/login" className="auth-link">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Garbage Truck Theme */}
      <div className="auth-theme-side">
        <div className="auth-theme-content">
          <div className="auth-theme-animation">
            <div className="auth-garbage-truck-scene">
              <div className="auth-garbage-truck">
                <div className="auth-truck-body">
                  <div className="auth-truck-cab"></div>
                  <div className="auth-truck-container">
                    <div className="auth-truck-waste"></div>
                  </div>
                  <div className="auth-truck-wheels">
                    <div className="auth-wheel auth-wheel-front"></div>
                    <div className="auth-wheel auth-wheel-back"></div>
                  </div>
                </div>
                <div className="auth-truck-exhaust"></div>
              </div>
              <div className="auth-garbage-collectors">
                <div className="auth-collector auth-collector-1">
                  <div className="auth-collector-body"></div>
                  <div className="auth-collector-arm"></div>
                </div>
                <div className="auth-collector auth-collector-2">
                  <div className="auth-collector-body"></div>
                  <div className="auth-collector-arm"></div>
                </div>
              </div>
              <div className="auth-floating-items">
                <span className="auth-float-item">🗑️</span>
                <span className="auth-float-item">♻️</span>
                <span className="auth-float-item">📦</span>
                <span className="auth-float-item">🌿</span>
                <span className="auth-float-item">♻️</span>
              </div>
            </div>
          </div>

          <div className="auth-theme-text">
            <h2>Join the<br />Recycling Revolution.</h2>
            <p>Be part of the solution. Start managing your waste collection with JEMAK today.</p>
            <div className="auth-features">
              <div className="auth-feature">
                <Leaf className="h-5 w-5 text-emerald-400" />
                <span>Eco-Friendly</span>
              </div>
              <div className="auth-feature">
                <Recycle className="h-5 w-5 text-emerald-400" />
                <span>Zero Waste</span>
              </div>
              <div className="auth-feature">
                <Truck className="h-5 w-5 text-emerald-400" />
                <span>Smart Logistics</span>
              </div>
            </div>
          </div>

          <div className="auth-theme-footer">
            <span>© 2026 JEMAK Waste Management. All rights reserved.</span>
          </div>
        </div>
      </div>
    </div>
  );
}