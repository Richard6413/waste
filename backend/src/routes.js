// Aggregates feature routers under the /api namespace.
const router = require('express').Router();
const { authenticateToken, requireRole } = require('./middleware/auth');

// Public routes (no auth required)
router.use('/auth', require('./modules/auth/routes'));            // Auth (login, register)

// Protected routes (JWT required)
router.use('/ops', authenticateToken, require('./modules/collectionOps/routes'));   // UC1
router.use('/schedules', authenticateToken, require('./modules/scheduling/routes')); // UC2
router.use('/billing', authenticateToken, require('./modules/billing/routes'));      // UC3
router.use('/analytics', authenticateToken, requireRole('admin'), require('./modules/analytics/routes'));  // UC4 - admin only
router.use('/catalog', authenticateToken, require('./modules/catalog/routes'));      // Demo / ops catalog

module.exports = router;
