import { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getAllUsers, toggleUserStatus } from '../../services/adminService';
import { User } from '../../models/User';
import { LockOpen, Lock } from '@mui/icons-material';

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);

  const loadUsers = async () => {
    const response = await getAllUsers();
    setUsers(response.data);
  };

  const handleToggleStatus = async (id: number) => {
    await toggleUserStatus(id);
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 200 },
    {
      field: 'roles',
      headerName: 'Roles',
      width: 200,
      valueGetter: (params) => params.row.roles.map((r: any) => r.authority).join(', ')
    },
    {
      field: 'enabled',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Typography color={params.value ? 'green' : 'red'}>
          {params.value ? 'Enabled' : 'Disabled'}
        </Typography>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Tooltip title={params.row.enabled ? 'Disable User' : 'Enable User'}>
          <IconButton onClick={() => handleToggleStatus(params.row.id)}>
            {params.row.enabled ? <Lock /> : <LockOpen />}
          </IconButton>
        </Tooltip>
      )
    }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>User Management</Typography>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.id}
        autoHeight
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default UserManagement;
