# Firebase Demo Users Setup

This guide explains how to create demo users in Firebase Authentication so they can be used to login via Firebase Auth.

## Prerequisites

1. **Firebase Project**: You need a Firebase project with Authentication enabled
2. **Service Account Key**: Download from Firebase Console

## Step 1: Enable Firebase Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`ledger-pulse-bmk`)
3. Navigate to **Authentication** > **Sign-in method**
4. Enable **Email/Password** provider
5. Click **Save**

## Step 2: Download Service Account Key

1. Go to **Project Settings** (gear icon) > **Service Accounts**
2. Click **Generate new private key**
3. Save the downloaded JSON file as `serviceAccountKey.json` in the `scripts/` directory

## Step 3: Install Dependencies

```powershell
cd scripts
npm install firebase-admin
```

## Step 4: Run the Script

```powershell
node create-firebase-demo-users.js
```

## What This Script Does

1. **Creates 3 demo users** in Firebase Authentication:
   - `admin@jemakwaste.com` / `Admin@123` (role: admin)
   - `collector@jemakwaste.com` / `Collector@123` (role: collector)
   - `resident@jemakwaste.com` / `Resident@123` (role: user)

2. **Sets custom claims** for role-based access control

3. **Creates Firestore documents** in the `users` collection with user profiles

## After Running

Users can now login via:
- **Firebase Auth** (Email/Password) - using the demo credentials
- **Backend API** (JWT) - using the same credentials
- **Demo mode** (localStorage) - fallback if Firebase is not configured

## Verification

After running the script, verify in Firebase Console:
1. **Authentication** > **Users** - should see 3 users
2. **Firestore** > **users** collection - should see 3 documents

## Troubleshooting

### "serviceAccountKey.json not found"
- Make sure you downloaded the service account key
- Save it as `scripts/serviceAccountKey.json`
- The file should be in the same directory as the script

### "Email already exists"
- The user was already created in a previous run
- The script will update the existing user's claims and Firestore document

### "Permission denied"
- Make sure your service account has permissions to:
  - Create users in Authentication
  - Read/write Firestore
