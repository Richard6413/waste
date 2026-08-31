// frontend/src/hooks/useHybridData.js
import { useState, useEffect, useCallback } from 'react';
import hybridService from '../services/hybridService';

export function useHybridData(type, options = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [realtime, setRealtime] = useState(options.realtime || false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let result;
      switch (type) {
        case 'waste':
          result = await hybridService.getWasteRecords();
          break;
        case 'routes':
          result = await hybridService.getRoutes();
          break;
        case 'invoices':
          result = await hybridService.getInvoices();
          break;
        default:
          throw new Error(`Unknown data type: ${type}`);
      }
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    if (!realtime) {
      fetchData();
      return;
    }

    let unsubscribe = null;
    
    switch (type) {
      case 'waste':
        unsubscribe = hybridService.listenToWasteUpdates((updates) => {
          setData(updates);
          setLoading(false);
        });
        break;
      case 'routes':
        unsubscribe = hybridService.listenToRouteUpdates((updates) => {
          setData(updates);
          setLoading(false);
        });
        break;
      case 'invoices':
        unsubscribe = hybridService.listenToInvoiceUpdates((updates) => {
          setData(updates);
          setLoading(false);
        });
        break;
      default:
        fetchData();
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [type, realtime, fetchData]);

  return { data, loading, error, refetch: fetchData, setRealtime };
}