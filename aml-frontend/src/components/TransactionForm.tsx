import { useState } from 'react';
import { Button, TextField, Box, Snackbar, Alert } from '@mui/material';
import { createTransaction } from '../services/api';

export default function TransactionForm() {
  const [formData, setFormData] = useState({
    accountNumber: '',
    amount: 0,
  });
  const [error, setError] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.accountNumber.trim()) {
      setError('Account Number is required');
      return;
    }
    if (formData.amount <= 0) {
      setError('Amount must be greater than zero');
      return;
    }
    try {
      await createTransaction(formData);
      setSuccessOpen(true);
      setFormData({ accountNumber: '', amount: 0 });
    } catch (err) {
      setError('Failed to submit transaction');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        label="Account Number"
        value={formData.accountNumber}
        onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
        fullWidth
        margin="normal"
        error={!!error && error.includes('Account Number')}
        helperText={error && error.includes('Account Number') ? error : ''}
      />
      <TextField
        label="Amount"
        type="number"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
        fullWidth
        margin="normal"
        error={!!error && error.includes('Amount')}
        helperText={error && error.includes('Amount') ? error : ''}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit
      </Button>

      <Snackbar
        open={successOpen}
        autoHideDuration={4000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccessOpen(false)} severity="success" sx={{ width: '100%' }}>
          Transaction submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
