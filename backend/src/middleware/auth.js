const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'jemak-waste-dev-secret-change-in-production';
const ALLOWED_DOMAIN = process.env.ALLOWED_EMAIL_DOMAIN || 'jemakwaste.com';

/**
 * Middleware to verify JWT token from Authorization header.
 * Attaches decoded user info to req.user.
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ ok: false, message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ ok: false, message: 'Token expired' });
    }
    return res.status(403).json({ ok: false, message: 'Invalid token' });
  }
}

/**
 * Middleware to restrict access to specific roles.
 * Use after authenticateToken.
 */
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ ok: false, message: 'Authentication required' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ ok: false, message: 'Insufficient permissions' });
    }
    next();
  };
}

/**
 * Validates that an email belongs to the allowed domain.
 */
function isAllowedDomain(email) {
  if (!email) return false;
  const domain = email.toLowerCase().split('@')[1];
  return domain === ALLOWED_DOMAIN.toLowerCase();
}

module.exports = {
  authenticateToken,
  requireRole,
  isAllowedDomain,
  JWT_SECRET,
  ALLOWED_DOMAIN,
};
