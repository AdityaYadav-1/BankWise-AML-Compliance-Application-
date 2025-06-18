import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import AlertBar from '../components/AlertBar';
import useTransactionAlerts from '../hooks/useTransactionAlerts';
import { Transaction } from '../models/Transaction';

const Dashboard = () => {
  const alerts = useTransactionAlerts();
  const [currentAlert, setCurrentAlert] = useState<Transaction | null>(null);

useEffect(() => {
  if (alerts.length > 0) {
    const suspiciousAlert = alerts.find((a) => a.suspicious);
    if (suspiciousAlert) {
      setCurrentAlert(suspiciousAlert);
      const timer = setTimeout(() => {
        setCurrentAlert(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }
}, [alerts]);


  return (
  <Box sx={{ flexGrow: 1, padding: 2 }}>
    <AlertBar alert={currentAlert} onClose={() => setCurrentAlert(null)} />

    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <TransactionForm />
      </Grid>
      <Grid item xs={12} md={8}>
        <TransactionList />
      </Grid>
    </Grid>
  </Box>
);

};

export default Dashboard;