import { Box, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

const mobileMode = window.innerWidth <= 768;

export default function UserSetting() {
  return (
    <Paper elevation={6}>
      <Stack spacing={2} p={2}>
        <Typography variant='h6'>UserSetting</Typography>
        <Stack direction='row' spacing={2} width='100%'>
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
