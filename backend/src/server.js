require('dotenv').config();
const { connectDB } = require('./db/mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3440;

// Bootstraps the API after establishing a database connection.
connectDB()
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`API up on :${PORT}`));
  })
  .catch(err => {
    console.error('DB connection failed:', err);
    process.exit(1);
  });
