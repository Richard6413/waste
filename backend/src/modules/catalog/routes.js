const router = require('express').Router();
const store = require('./store');

router.get('/', (_req, res) => res.json(store.snapshot()));
router.get('/bins', (_req, res) => res.json({ items: store.snapshot().bins }));
router.get('/alerts', (_req, res) => res.json({ items: store.snapshot().alerts }));
router.get('/requests', (_req, res) => res.json({ items: store.snapshot().requests }));
router.post('/requests', (req, res) => res.status(201).json(store.addRequest(req.body || {})));
router.patch('/requests/:id', (req, res) => {
  const updated = store.updateRequest(req.params.id, req.body?.status || 'scheduled');
  if (!updated) return res.status(404).json({ error: 'Request not found' });
  return res.json(updated);
});
router.get('/centres', (_req, res) => res.json({ items: store.snapshot().centres }));
router.get('/incidents', (_req, res) => res.json({ items: store.snapshot().incidents }));
router.post('/incidents', (req, res) => res.status(201).json(store.addIncident(req.body || {})));

module.exports = router;
