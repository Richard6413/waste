// frontend/src/pages/Auth/LoginPage.jsx
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Alert, Box, Button, CircularProgress, Paper, 
  Stack, TextField, Typography, Link, Divider
} from '@mui/material';
import { 
  ShieldCheck, Truck, Leaf, Recycle, Sparkles, 
  ArrowLeft, Mail, Send, Eye, EyeOff, Phone, Mail as MailIcon
} from 'lucide-react';
import { 
  auth, 
  signInWithPopup, 
  googleProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from '../../config/firebase';
import { getUserData } from '../../utils/userHelpers';

export default function LoginPage({ onLogin = () => {} }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({ email: '', password: '' });
    const [forgotEmail, setForgotEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [resetSent, setResetSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [loginMethod, setLoginMethod] = useState('email');
    const [feedback, setFeedback] = useState(() => {
        if (location.state?.notice) {
            return { type: 'info', message: location.state.notice };
        }
        return null;
    });

    const handleChange = useCallback(event => {
        const { name, value } = event.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleForgotEmailChange = useCallback(event => {
        setForgotEmail(event.target.value);
    }, []);

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    const handleTermsChange = useCallback((event) => {
        setTermsAccepted(event.target.checked);
    }, []);

    // Handle email/password login
    const handleSubmit = useCallback(async event => {
        event.preventDefault();
        
        if (!termsAccepted) {
            setFeedback({ type: 'error', message: 'Please accept the Terms & Privacy policy to continue.' });
            return;
        }
        
        setLoading(true);
        setFeedback(null);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
            const user = userCredential.user;
            
            const userData = await getUserData(user.uid);
            
            const sessionData = {
                uid: user.uid,
                email: user.email,
                name: user.displayName || userData?.name || user.email?.split('@')[0] || 'User',
                role: userData?.role || 'user',
                token: await user.getIdToken(),
                ...userData
            };

            setFeedback({ type: 'success', message: 'Signed in successfully.' });
            onLogin(sessionData);

            const destination = sessionData.role === 'admin' ? '/adminDashboard' : '/';
            navigate(destination, { replace: true });
        } catch (error) {
            console.error('Login error:', error);
            let errorMessage = 'Login failed. Please check your credentials.';
            
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'No account found with this email.';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password. Please try again.';
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = 'Too many failed attempts. Please try again later.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address.';
            } else if (error.code === 'auth/user-disabled') {
                errorMessage = 'This account has been disabled.';
            }
            
            setFeedback({ type: 'error', message: errorMessage });
        } finally {
            setLoading(false);
        }
    }, [form, navigate, onLogin, termsAccepted]);

    // Handle Google login
    const handleGoogleLogin = useCallback(async () => {
        if (!termsAccepted) {
            setFeedback({ type: 'error', message: 'Please accept the Terms & Privacy policy to continue.' });
            return;
        }
        
        setGoogleLoading(true);
        setFeedback(null);

        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            
            const userData = await getUserData(user.uid);
            
            const sessionData = {
                uid: user.uid,
                email: user.email,
                name: user.displayName || userData?.name || user.email?.split('@')[0] || 'User',
                role: userData?.role || 'user',
                token: await user.getIdToken(),
                ...userData
            };

            setFeedback({ type: 'success', message: 'Signed in successfully with Google.' });
            onLogin(sessionData);

            const destination = sessionData.role === 'admin' ? '/adminDashboard' : '/';
            navigate(destination, { replace: true });
        } catch (error) {
            console.error('Google login error:', error);
            let errorMessage = 'Google login failed. Please try again.';
            
            if (error.code === 'auth/popup-closed-by-user') {
                errorMessage = 'Sign-in popup was closed. Please try again.';
            } else if (error.code === 'auth/popup-blocked') {
                errorMessage = 'Pop-up was blocked. Please allow pop-ups for this site.';
            }
            
            setFeedback({ type: 'error', message: errorMessage });
        } finally {
            setGoogleLoading(false);
        }
    }, [navigate, onLogin, termsAccepted]);

    // Handle forgot password
    const handleForgotPassword = useCallback(async (event) => {
        event.preventDefault();
        setResetLoading(true);
        setFeedback(null);
        setResetSent(false);

        try {
            await sendPasswordResetEmail(auth, forgotEmail);
            setResetSent(true);
            setFeedback({ 
                type: 'success', 
                message: `Password reset email sent to ${forgotEmail}. Please check your inbox.` 
            });
            
            setTimeout(() => {
                setIsFlipped(false);
                setResetSent(false);
                setForgotEmail('');
            }, 3000);
        } catch (error) {
            console.error('Reset password error:', error);
            let errorMessage = 'Failed to send reset email. Please try again.';
            
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'No account found with this email address.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address. Please check and try again.';
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = 'Too many requests. Please try again later.';
            }
            
            setFeedback({ type: 'error', message: errorMessage });
        } finally {
            setResetLoading(false);
        }
    }, [forgotEmail]);

    const handleFlipToForgot = useCallback(() => {
        setIsFlipped(true);
        setFeedback(null);
        setResetSent(false);
        setForgotEmail('');
    }, []);

    const handleFlipBack = useCallback(() => {
        setIsFlipped(false);
        setFeedback(null);
        setResetSent(false);
        setForgotEmail('');
    }, []);

    return (
        <div className="auth-container">
            {/* Left Side - Form */}
            <div className="auth-form-side">
                <div className="auth-form-wrapper">
                    {/* Brand - Centered */}
                    <div className="auth-brand-centered">
                        <div className="auth-logo">
                            <img 
                                src="https://via.placeholder.com/80x80/10b981/ffffff?text=J" 
                                alt="JEMAK Logo"
                                className="auth-logo-img"
                            />
                        </div>
                        <div className="auth-brand-text">
                            <div className="auth-brand-name">JEMAK</div>
                            <div className="auth-brand-subtitle">♻️ Waste Management</div>
                        </div>
                    </div>

                    {/* Header - Centered */}
                    <div className="auth-header-centered">
                        <h1 className="auth-title">Welcome Back</h1>
                        <p className="auth-subtitle">Sign in to your account to continue</p>
                    </div>

                    {/* Card Container with Flip */}
                    <div className="auth-card-container">
                        <div className={`auth-card ${isFlipped ? 'auth-card-flipped' : ''}`}>
                            {/* Front - Login */}
                            <div className="auth-card-front">
                                <div className="auth-form-wrapper-inner">
                                    {/* Google Sign In */}
                                    <button
                                        type="button"
                                        onClick={handleGoogleLogin}
                                        disabled={loading || googleLoading}
                                        className="auth-btn-google auth-btn-google-top"
                                    >
                                        {googleLoading ? (
                                            <CircularProgress size={20} color="inherit" />
                                        ) : (
                                            <>
                                                <svg width="18" height="18" viewBox="0 0 18 18">
                                                    <path d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2089 1.125-.8436 2.0781-1.7977 2.7168v2.2581h2.9081c1.7045-1.5682 2.685-3.8773 2.685-6.6154z" fill="#4285f4"/>
                                                    <path d="M9 18c2.43 0 4.4673-.8059 5.9564-2.1805l-2.9081-2.2581c-.8059.5409-1.8368.8591-3.0482.8591-2.3441 0-4.3282-1.5832-5.0341-3.7104H.9573v2.3318C2.4382 15.9832 5.4818 18 9 18z" fill="#34a853"/>
                                                    <path d="M3.9645 10.7105c-.18-.5409-.2823-1.1168-.2823-1.7105s.1023-1.1696.2823-1.7105V4.9577H.9573C.3477 6.1732 0 7.5477 0 9c0 1.4523.3477 2.8268.9573 4.0423L3.9645 10.7105z" fill="#fbbc05"/>
                                                    <path d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.3468l2.5814-2.5814C13.4632.8918 11.4259 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9577L3.9645 7.2891C4.6705 5.1627 6.6559 3.5795 9 3.5795z" fill="#ea4335"/>
                                                </svg>
                                                Continue with Google
                                            </>
                                        )}
                                    </button>

                                    <Divider className="auth-divider auth-divider-small">or</Divider>

                                    {feedback && (
                                        <Alert 
                                            severity={feedback.type} 
                                            onClose={() => setFeedback(null)}
                                            className="auth-alert auth-alert-small"
                                        >
                                            {feedback.message}
                                        </Alert>
                                    )}

                                    {/* Login Method Toggle */}
                                    <div className="auth-method-toggle">
                                        <button
                                            type="button"
                                            className={`auth-method-btn ${loginMethod === 'email' ? 'active' : ''}`}
                                            onClick={() => setLoginMethod('email')}
                                        >
                                            <MailIcon className="h-4 w-4" />
                                            Email
                                        </button>
                                        <button
                                            type="button"
                                            className={`auth-method-btn ${loginMethod === 'phone' ? 'active' : ''}`}
                                            onClick={() => setLoginMethod('phone')}
                                        >
                                            <Phone className="h-4 w-4" />
                                            Phone
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmit} className="auth-form auth-form-compact">
                                        <div className="auth-form-group">
                                            <label className="auth-label">
                                                {loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
                                            </label>
                                            <input
                                                type={loginMethod === 'email' ? 'email' : 'tel'}
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                                autoComplete={loginMethod === 'email' ? 'email' : 'tel'}
                                                autoFocus
                                                className="auth-input auth-input-transparent"
                                                placeholder={loginMethod === 'email' ? 'you@example.com' : '+256 700 000 000'}
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
                                                    autoComplete="current-password"
                                                    className="auth-input auth-password-input auth-input-transparent"
                                                    placeholder="Enter your password"
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

                                        <div className="auth-options">
                                            <label className="auth-checkbox">
                                                <input type="checkbox" />
                                                <span>Remember me</span>
                                            </label>
                                            <button 
                                                type="button"
                                                onClick={handleFlipToForgot}
                                                className="auth-forgot-btn"
                                            >
                                                Forgot password?
                                            </button>
                                        </div>

                                        <div className="auth-terms">
                                            <label className="auth-checkbox auth-terms-checkbox">
                                                <input 
                                                    type="checkbox" 
                                                    checked={termsAccepted}
                                                    onChange={handleTermsChange}
                                                />
                                                <span className="auth-terms-text">
                                                    I accept the <Link component={RouterLink} to="/terms" className="auth-link">Terms</Link> &amp; <Link component={RouterLink} to="/privacy" className="auth-link">Privacy Policy</Link>
                                                </span>
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading || googleLoading}
                                            className="auth-btn-primary auth-btn-visible"
                                        >
                                            {loading ? <CircularProgress size={20} color="inherit" /> : 'Sign In'}
                                        </button>

                                        <p className="auth-footer-text auth-footer-text-large">
                                            Don't have an account?{' '}
                                            <Link component={RouterLink} to="/register" className="auth-link">
                                                Create one now
                                            </Link>
                                        </p>
                                    </form>
                                </div>
                            </div>

                            {/* Back - Forgot Password */}
                            <div className="auth-card-back">
                                <button 
                                    type="button"
                                    onClick={handleFlipBack}
                                    className="auth-back-btn"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Sign In
                                </button>

                                <div className="auth-header-centered">
                                    <h1 className="auth-title">Reset Password</h1>
                                    <p className="auth-subtitle">
                                        Enter your email address and we'll send you a link to reset your password.
                                    </p>
                                </div>

                                {feedback && (
                                    <Alert 
                                        severity={feedback.type} 
                                        onClose={() => setFeedback(null)}
                                        className="auth-alert auth-alert-small"
                                    >
                                        {feedback.message}
                                    </Alert>
                                )}

                                {resetSent ? (
                                    <div className="auth-reset-success">
                                        <Mail className="h-10 w-10 text-emerald-400" />
                                        <h3>Check Your Email</h3>
                                        <p>
                                            We've sent a password reset link to <strong>{forgotEmail}</strong>.
                                        </p>
                                        <div className="auth-reset-timer">
                                            <span>Redirecting to sign in...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleForgotPassword} className="auth-form auth-form-compact">
                                        <div className="auth-form-group">
                                            <label className="auth-label">Email Address</label>
                                            <input
                                                type="email"
                                                value={forgotEmail}
                                                onChange={handleForgotEmailChange}
                                                required
                                                autoComplete="email"
                                                autoFocus
                                                className="auth-input auth-input-transparent"
                                                placeholder="you@example.com"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={resetLoading}
                                            className="auth-btn-primary auth-btn-visible"
                                        >
                                            {resetLoading ? (
                                                <CircularProgress size={20} color="inherit" />
                                            ) : (
                                                <>
                                                    <Send className="h-4 w-4" />
                                                    Send Reset Link
                                                </>
                                            )}
                                        </button>

                                        <p className="auth-footer-text auth-footer-text-large">
                                            Remember your password?{' '}
                                            <button
                                                type="button"
                                                onClick={handleFlipBack}
                                                className="auth-link-btn"
                                            >
                                                Sign in
                                            </button>
                                        </p>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
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
                        <h2>Waste Management,<br />Simplified.</h2>
                        <p>Join thousands of businesses using JEMAK to streamline their waste collection operations.</p>
                        <div className="auth-features">
                            <div className="auth-feature">
                                <Leaf className="h-4 w-4 text-emerald-400" />
                                <span>Sustainable Solutions</span>
                            </div>
                            <div className="auth-feature">
                                <Recycle className="h-4 w-4 text-emerald-400" />
                                <span>Smart Recycling</span>
                            </div>
                            <div className="auth-feature">
                                <Truck className="h-4 w-4 text-emerald-400" />
                                <span>Efficient Collection</span>
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

LoginPage.propTypes = {
    onLogin: PropTypes.func,
};