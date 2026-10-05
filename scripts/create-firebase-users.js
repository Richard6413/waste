// scripts/create-firebase-users.js
// Creates demo Firebase Auth users and matching Firestore documents
// Run with: node create-firebase-users.js

const { initializeApp } = require('firebase/app');
const {
  getAuth,
  createUserWithEmailAndPassword,
} = require('firebase/auth');
const {
  getFirestore,
  doc,
  setDoc,
} = require('firebase/firestore');
require('dotenv').config({ path: require('path').resolve(__dirname, '../frontend/.env') });

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const demoUsers = [
  {
    name: 'Nadeesha Perera',
    email: 'admin@smartwaste.lk',
    password: 'Admin@123',
    role: 'admin',
  },
  {
    name: 'Chamika Fernando',
    email: 'collector@smartwaste.lk',
    password: 'Collector@123',
    role: 'user',
  },
  {
    name: 'Ishara Silva',
    email: 'resident@smartwaste.lk',
    password: 'Resident@123',
    role: 'user',
  },
];

(async () => {
  console.log('Creating Firebase demo users...\n');

  for (const user of demoUsers) {
    try {
      // Create Firebase Auth user
      const cred = await createUserWithEmailAndPassword(auth, user.email, user.password);
      const uid = cred.user.uid;

      // Create Firestore document
      await setDoc(doc(db, 'users', uid), {
        uid: uid,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      console.log(`Created: ${user.email} (role: ${user.role}, uid: ${uid})`);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        console.log(`Already exists: ${user.email}`);
      } else {
        console.error(`Failed ${user.email}:`, err.message);
      }
    }
  }

  console.log('\nDone! You can now login at http://localhost:3440/login');
  process.exit(0);
})();
