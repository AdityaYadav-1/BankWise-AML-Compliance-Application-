import { Snackbar, Alert, AlertTitle, Slide } from '@mui/material';
import { Transaction } from '../models/Transaction';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface AlertBarProps {
  alert: Transaction | null;
  onClose: () => void;
}

const AlertBar = ({ alert, onClose }: AlertBarProps) => {
  if (!alert) return null;

  const isSuspicious = alert.suspicious;

  return (
    <Snackbar
      open={!!alert}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      TransitionComponent={Slide}
    >
      <Alert
        onClose={onClose}
        severity={isSuspicious ? 'warning' : 'success'}
        icon={isSuspicious ? <WarningAmberIcon fontSize="inherit" /> : <CheckCircleIcon fontSize="inherit" />}
        sx={{ width: '100%', fontSize: '0.95rem' }}
      >
        <AlertTitle>
          {isSuspicious ? 'Suspicious Transaction' : 'Transaction Added'}
        </AlertTitle>
        {isSuspicious
          ? `Reason: ${alert.suspiciousReason}`
          : `Amount: $${alert.amount.toFixed(2)} - Account: ${alert.accountNumber}`}
      </Alert>
    </Snackbar>
  );
};

export default AlertBar;
