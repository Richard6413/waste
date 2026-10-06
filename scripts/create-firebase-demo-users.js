/**
 * Script to create demo users in Firebase Authentication
 * 
 * This script creates the three demo accounts in Firebase Auth:
 * - admin@jemakwaste.com (Admin@123) - admin role
 * - collector@jemakwaste.com (Collector@123) - collector role
 * - resident@jemakwaste.com (Resident@123) - user role
 * 
 * Prerequisites:
 * 1. Install firebase-admin: npm install firebase-admin
 * 2. Download service account key from Firebase Console:
 *    - Go to Project Settings > Service Accounts
 *    - Click "Generate new private key"
 *    - Save as serviceAccountKey.json in this directory
 * 
 * Usage: node scripts/create-firebase-demo-users.js
 */

const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin with service account
// Download your service account key from Firebase Console:
// Project Settings > Service Accounts > Generate new private key
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');

try {
  const serviceAccount = require(serviceAccountPath);
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  
  console.log('✅ Firebase Admin initialized successfully');
} catch (error) {
  console.error('❌ Error initializing Firebase Admin:');
  console.error('   Make sure you have downloaded your service account key:');
  console.error('   1. Go to Firebase Console > Project Settings > Service Accounts');
  console.error('   2. Click "Generate new private key"');
  console.error('   3. Save as "serviceAccountKey.json" in the scripts/ directory');
  console.error('\n   Error:', error.message);
  process.exit(1);
}

const auth = admin.auth();
const db = admin.firestore();

// Demo users to create
const demoUsers = [
  {
    email: 'admin@jemakwaste.com',
    password: 'Admin@123',
    displayName: 'Nimali Admin',
    role: 'admin',
    phone: '+94 77 123 4567',
  },
  {
    email: 'collector@jemakwaste.com',
    password: 'Collector@123',
    displayName: 'Kasun Collector',
    role: 'collector',
    phone: '+94 77 234 5678',
  },
  {
    email: 'resident@jemakwaste.com',
    password: 'Resident@123',
    displayName: 'Ishara Resident',
    role: 'user',
    phone: '+94 77 345 6789',
  },
];

async function createDemoUsers() {
  console.log('\n🚀 Creating demo users in Firebase Authentication...\n');

  for (const userData of demoUsers) {
    try {
      // Check if user already exists
      let userRecord;
      try {
        userRecord = await auth.getUserByEmail(userData.email);
        console.log(`⚠️  User already exists: ${userData.email}`);
      } catch (error) {
        // User doesn't exist, create it
        userRecord = await auth.createUser({
          email: userData.email,
          password: userData.password,
          displayName: userData.displayName,
          phoneNumber: userData.phone,
          emailVerified: true,
        });
        console.log(`✅ Created user: ${userData.email} (${userRecord.uid})`);
      }

      // Set custom claims for role-based access
      await auth.setCustomUserClaims(userRecord.uid, {
        role: userData.role,
        name: userData.displayName,
      });
      console.log(`   └─ Set role: ${userData.role}`);

      // Create or update user document in Firestore
      const userDocRef = db.collection('users').doc(userRecord.uid);
      const userDoc = await userDocRef.get();

      if (!userDoc.exists) {
        await userDocRef.set({
          uid: userRecord.uid,
          email: userData.email,
          name: userData.displayName,
          role: userData.role,
          phone: userData.phone,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log(`   └─ Created Firestore document`);
      } else {
        await userDocRef.update({
          role: userData.role,
          name: userData.displayName,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log(`   └─ Updated Firestore document`);
      }

      console.log('');
    } catch (error) {
      console.error(`❌ Error creating user ${userData.email}:`, error.message);
    }
  }

  console.log('✨ Demo user setup complete!\n');
  console.log('You can now login with these credentials:');
  console.log('  • admin@jemakwaste.com / Admin@123 (Admin)');
  console.log('  • collector@jemakwaste.com / Collector@123 (Collector)');
  console.log('  • resident@jemakwaste.com / Resident@123 (User)');
  console.log('');
}

createDemoUsers()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
