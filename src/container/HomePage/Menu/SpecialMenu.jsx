import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import CardPreview from '../../../components/CardPreview';

export default function SpecialMenu() {
  return (
    <Container>
      <Grid container height='100vh'>
        <Grid item xs={6}>
          <CardPreview />
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </Container>
  );
}
