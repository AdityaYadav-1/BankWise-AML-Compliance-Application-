import { useEffect, useState } from 'react';
import { Transaction } from '../models/Transaction';

const useTransactionAlerts = () => {
  const [alerts, setAlerts] = useState<Transaction[]>([]);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8080/api/transactions/realtime');
    
    eventSource.onmessage = (e) => {
  try {
    const newTransaction: Transaction = JSON.parse(e.data);
    setAlerts(prev => [newTransaction, ...prev]);
  } catch (err) {
    console.warn('Ignored non-JSON SSE message:', e.data);
  }
};

    return () => eventSource.close();
  }, []);

  return alerts;
};

export default useTransactionAlerts;