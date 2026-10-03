require('dotenv').config();
const { connectDB } = require('./db/mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3440;

function listen() {
  app.listen(PORT, '0.0.0.0', () => console.log(`API up on :${PORT}`));
}

connectDB()
  .then(() => {
    console.log('✅ MongoDB connected');
    listen();
  })
  .catch((err) => {
    console.error('DB connection failed:', err.message || err);
    console.warn('Starting API without MongoDB (catalog endpoints still available).');
    listen();
  });
