import {
  Avatar,
  Box, Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect } from 'react';

const mobileMode = window.innerWidth <= 768;

export default function UserSetting() {
  useEffect(() => {
    const fetchData = async () => {
      
    }
  },[]);
  return (
    <Paper elevation={6}>
      <Stack spacing={2} px={24} py={2}>
        <Typography variant='h5' mb={2}>
          Thông tin cơ bản:
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ width: 60, height: 60 }} />
          <Typography variant='h6' mt={1}>
            ADMIN
          </Typography>
        </Box>
        <Stack direction='row' spacing={7} width='100%'>
          <Box>
            <Typography>Họ và tên đệm:</Typography>
            <TextField fullWidth size='small' />
          </Box>
          <Box>
            <Typography>Tên:</Typography>
            <TextField fullWidth size='small' />
          </Box>
        </Stack>
        <Box>
          <Typography>Email:</Typography>
          <TextField fullWidth size='small' />
        </Box>
        <Box>
          <Typography>Số điện thoại:</Typography>
          <TextField fullWidth size='small' />
        </Box>
      </Stack>
    </Paper>
  );
}
