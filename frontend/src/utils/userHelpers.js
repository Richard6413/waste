// frontend/src/utils/userHelpers.js
import { 
  db, 
  doc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  setDoc,      // Added this import
  updateDoc    // Added this import
} from '../config/firebase';

/**
 * Get user role from Firestore
 * @param {string} uid - Firebase user UID
 * @returns {Promise<string>} - User role (admin, user, etc.)
 */
export const getUserRole = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data().role || 'user';
    }
    return 'user';
  } catch (error) {
    console.error('Error fetching user role:', error);
    return 'user';
  }
};

/**
 * Get complete user data from Firestore
 * @param {string} uid - Firebase user UID
 * @returns {Promise<Object|null>} - User data object or null if not found
 */
export const getUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

/**
 * Get user by email from Firestore
 * @param {string} email - User email
 * @returns {Promise<Object|null>} - User data or null if not found
 */
export const getUserByEmail = async (email) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
};

/**
 * Check if user is admin
 * @param {string} uid - Firebase user UID
 * @returns {Promise<boolean>} - True if user is admin
 */
export const isUserAdmin = async (uid) => {
  const role = await getUserRole(uid);
  return role === 'admin';
};

/**
 * Create user document in Firestore
 * @param {string} uid - Firebase user UID
 * @param {Object} userData - User data to save
 * @returns {Promise<void>}
 */
export const createUserDocument = async (uid, userData) => {
  try {
    await setDoc(doc(db, 'users', uid), {
      uid: uid,
      email: userData.email,
      name: userData.name || userData.email?.split('@')[0] || 'User',
      role: userData.role || 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...userData
    });
  } catch (error) {
    console.error('Error creating user document:', error);
    throw error;
  }
};

/**
 * Update user document in Firestore
 * @param {string} uid - Firebase user UID
 * @param {Object} updates - Fields to update
 * @returns {Promise<void>}
 */
export const updateUserDocument = async (uid, updates) => {
  try {
    await updateDoc(doc(db, 'users', uid), {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating user document:', error);
    throw error;
  }
};