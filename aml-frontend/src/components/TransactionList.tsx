import { useState, useEffect } from 'react';
import { 
  DataGrid, 
  GridColDef, 
  GridPaginationModel,
  GridRenderCellParams,
  GridToolbar
} from '@mui/x-data-grid';
import { fetchTransactions, fetchSuspiciousTransactions } from '../services/api';
import { Transaction } from '../models/Transaction';
import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material';

const columns: GridColDef<Transaction>[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'accountNumber', headerName: 'Account', width: 130 },
  { 
    field: 'amount', 
    headerName: 'Amount', 
    width: 100,
    type: 'number',
    valueFormatter: (params: { value: number }) => `$${params.value.toFixed(2)}`
  },
  { field: 'transactionType', headerName: 'Type', width: 100 },
  { 
    field: 'suspicious', 
    headerName: 'Status', 
    width: 120,
    renderCell: (params: GridRenderCellParams<Transaction, boolean>) => (
      <span style={{ color: params.value ? 'red' : 'green' }}>
        {params.value ? 'Suspicious' : 'Cleared'}
      </span>
    )
  },
  { 
    field: 'suspiciousReason', 
    headerName: 'Reason', 
    width: 200,
    renderCell: (params: GridRenderCellParams<Transaction, string>) => (
      params.row.suspicious ? (
        <span style={{ color: 'red' }}>{params.value}</span>
      ) : null
    )
  },
  { field: 'timestamp', headerName: 'Date', width: 180, type: 'dateTime' },
];

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });
  const [view, setView] = useState<'all' | 'suspicious'>('all');

  useEffect(() => {
    const fetchData = async () => {
      const response = view === 'all' 
        ? await fetchTransactions() 
        : await fetchSuspiciousTransactions();

      // Convert timestamp strings to Date objects for MUI DataGrid dateTime type column
      const dataWithDates = response.data.map((txn: Transaction) => ({
        ...txn,
        timestamp: new Date(txn.timestamp),
      }));

      setTransactions(dataWithDates);
    };
    fetchData();
  }, [view]);

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(_, newView) => setView(newView)}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="all">All Transactions</ToggleButton>
        <ToggleButton value="suspicious">Suspicious Only</ToggleButton>
      </ToggleButtonGroup>
      
      <DataGrid
        rows={transactions}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 25]}
        getRowId={(row) => row.id}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Box>
  );
}
