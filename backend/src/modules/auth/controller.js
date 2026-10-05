const { z } = require('zod');
const jwt = require('jsonwebtoken');
const authService = require('./service');
const { isAllowedDomain, JWT_SECRET } = require('../../middleware/auth');

const { ERROR_CODES } = authService;

// Normalised JSON error shape keeps the frontend handler simple.
const respondWithError = (res, status, message, extra = {}) => (
  res.status(status).json({ ok: false, message, ...extra })
);

// Credentials rules mirror the registration form expectations.
const loginSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email('Enter a valid email'),
  password: z.string({ required_error: 'Password is required' }).min(6, 'Password must be at least 6 characters'),
});

// Registration requires a stronger password than login for future-proofing.
const registerSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(2, 'Name must be at least 2 characters').max(80, 'Name is too long'),
  email: z.string({ required_error: 'Email is required' }).email('Enter a valid email'),
  password: z.string({ required_error: 'Password is required' }).min(8, 'Password must be at least 8 characters'),
});

// JWT token expiration
const TOKEN_EXPIRY = '24h';

/**
 * Generates a JWT token for an authenticated user.
 */
function generateToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
}

// Authenticates a user and returns a JWT token + user profile.
async function login(req, res, next) {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return respondWithError(res, 400, parsed.error.errors[0].message);
    }

    const { email, password } = parsed.data;

    // Domain restriction: only allow emails from the configured domain
    if (!isAllowedDomain(email)) {
      return respondWithError(res, 403, `Only @${process.env.ALLOWED_EMAIL_DOMAIN || 'jemakwaste.com'} accounts are allowed`);
    }

    const user = await authService.authenticate(email, password);

    if (!user) {
      return respondWithError(res, 401, 'Invalid email or password');
    }

    const token = generateToken(user);

    return res.json({
      ok: true,
      message: `Welcome back, ${user.name}`,
      user,
      token,
    });
  } catch (error) {
    if (error.code === ERROR_CODES.inactive) {
      return respondWithError(res, 403, error.message);
    }
    if (error.code === ERROR_CODES.locked) {
      return respondWithError(res, 423, error.message, { lockUntil: error.lockUntil });
    }
    return next(error);
  }
}

// Creates a user account and immediately signs the caller in.
async function register(req, res, next) {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return respondWithError(res, 400, parsed.error.errors[0].message);
    }

    const payload = parsed.data;

    // Domain restriction on registration too
    if (!isAllowedDomain(payload.email)) {
      return respondWithError(res, 403, `Only @${process.env.ALLOWED_EMAIL_DOMAIN || 'jemakwaste.com'} accounts are allowed`);
    }

    const user = await authService.createUser(payload);
    const token = generateToken(user);

    return res.status(201).json({
      ok: true,
      message: 'Account created. You are now signed in.',
      user,
      token,
    });
  } catch (error) {
    if (error.code === ERROR_CODES.emailTaken) {
      return respondWithError(res, 409, error.message);
    }
    return next(error);
  }
}

module.exports = {
  login,
  register,
};
