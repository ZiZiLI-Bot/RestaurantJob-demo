import { Grid, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

export default function TextFieldCustom({ data }) {
  return (
    <Grid item xs={data.width} spacing={1}>
      <Typography mb={1}>{data.label}</Typography>
      <TextField fullWidth size='small' defaultValue={data.value} />
    </Grid>
  );
}
