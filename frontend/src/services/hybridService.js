// frontend/src/services/hybridService.js
import api from '../api/client';
import { 
  db, 
  collection, 
  addDoc, 
  // REMOVED: getDocs, getDoc, updateDoc, deleteDoc
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  doc,
  setDoc
} from '../config/firebase';

/**
 * Hybrid Service - Uses MongoDB for persistence and Firestore for real-time
 */
class HybridService {
  // ============================================================
  // WASTE COLLECTIONS (MongoDB Primary, Firestore Sync)
  // ============================================================
  
  // Get all waste records (MongoDB)
  async getWasteRecords() {
    return await api.getWasteRecords();
  }

  // Create waste record (MongoDB + Firestore sync)
  async createWasteRecord(data) {
    const result = await api.createWasteRecord(data);
    
    // Sync to Firestore for real-time updates
    try {
      await addDoc(collection(db, 'waste_collections'), {
        ...result,
        _id: result.id,
        syncedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.warn('Failed to sync to Firestore:', error);
    }
    
    return result;
  }

  // Listen to real-time waste updates (Firestore)
  listenToWasteUpdates(callback) {
    const q = query(
      collection(db, 'waste_collections'),
      orderBy('timestamp', 'desc'),
      limit(100)
    );
    
    return onSnapshot(q, (snapshot) => {
      const updates = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(updates);
    });
  }

  // ============================================================
  // ROUTES (MongoDB Primary)
  // ============================================================
  
  async getRoutes() {
    return await api.getRoutes();
  }

  async createRoute(data) {
    const result = await api.createRoute(data);
    
    try {
      await addDoc(collection(db, 'routes'), {
        ...result,
        _id: result.id,
        syncedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.warn('Failed to sync route to Firestore:', error);
    }
    
    return result;
  }

  listenToRouteUpdates(callback) {
    const q = query(
      collection(db, 'routes'),
      where('status', 'in', ['active', 'in-progress']),
      orderBy('timestamp', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const updates = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(updates);
    });
  }

  // ============================================================
  // LIVE VEHICLE TRACKING (Firestore Only)
  // ============================================================
  
  async updateVehicleLocation(vehicleId, location) {
    const docRef = doc(db, 'vehicle_locations', vehicleId);
    await setDoc(docRef, {
      vehicleId,
      location,
      timestamp: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  }

  listenToVehicleLocations(callback) {
    const q = query(
      collection(db, 'vehicle_locations'),
      orderBy('timestamp', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const locations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(locations);
    });
  }

  // ============================================================
  // INVOICES (MongoDB Primary)
  // ============================================================
  
  async getInvoices() {
    return await api.getInvoices();
  }

  async createInvoice(data) {
    const result = await api.createInvoice(data);
    
    try {
      await addDoc(collection(db, 'invoices'), {
        ...result,
        _id: result.id,
        syncedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.warn('Failed to sync invoice to Firestore:', error);
    }
    
    return result;
  }

  listenToInvoiceUpdates(callback) {
    const q = query(
      collection(db, 'invoices'),
      where('status', 'in', ['pending', 'overdue']),
      orderBy('dueDate', 'asc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const updates = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(updates);
    });
  }
}

export default new HybridService();