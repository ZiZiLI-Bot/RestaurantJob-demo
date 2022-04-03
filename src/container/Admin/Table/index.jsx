import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import TableAPI from '../../../API/TableAPI';
import styles from '../Categories/Categories.module.css';

const fakeData = [
  {
    name: 'Table 1',
    capacity: 6,
    isAvailable: true,
    location: 'Bar',
  },
  {
    name: 'Table 2',
    capacity: 7,
    isAvailable: false,
    location: 'Bar',
  },
  {
    name: 'Table 3',
    capacity: 2,
    isAvailable: true,
    location: 'Patio',
  },
  {
    name: 'Table 4',
    capacity: 4,
    isAvailable: false,
    location: 'Inside',
  },
  {
    name: 'Table 5',
    capacity: 5,
    isAvailable: true,
    location: 'Patio',
  },
  {
    name: 'Table 6',
    capacity: 4,
    isAvailable: true,
    location: 'Bar',
  },
  {
    name: 'Table 7',
    capacity: 3,
    isAvailable: true,
    location: 'Bar',
  },
  {
    name: 'Table 8',
    capacity: 3,
    isAvailable: true,
    location: 'Patio',
  },
  {
    name: 'Table 9',
    capacity: 3,
    isAvailable: true,
    location: 'Inside',
  },
  {
    name: 'Table 10',
    capacity: 5,
    isAvailable: true,
    location: 'Bar',
  },
  {
    name: 'Table 11',
    capacity: 6,
    isAvailable: true,
    location: 'Bar',
  },
  {
    name: 'Table 12',
    capacity: 2,
    isAvailable: true,
    location: 'Inside',
  },
  {
    name: 'Table 13',
    capacity: 7,
    isAvailable: true,
    location: 'Inside',
  },
  {
    name: 'Table 14',
    capacity: 5,
    isAvailable: true,
    location: 'Inside',
  },
  {
    name: 'Table 15',
    capacity: 5,
    isAvailable: true,
    location: 'Patio',
  },
  {
    name: 'Table 16',
    capacity: 3,
    isAvailable: true,
    location: 'Patio',
  },
  {
    name: 'Table 17',
    capacity: 3,
    isAvailable: true,
    location: 'Bar',
  },
  {
    name: 'Table 18',
    capacity: 2,
    isAvailable: true,
    location: 'Inside',
  },
];

export default function TableAdmin() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [openDLDelete, setOpenDLDelete] = useState(false);
  const [select, setSelect] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await TableAPI.getAllTables();
      console.log(res);
    };
    fetchData();
  }, []);
  const handleClickOpenDelete = (item) => {
    setSelect(item);
    setOpenDLDelete(true);
  };
  const confirmDeleteCategory = async () => {
    setOpenDLDelete(false);
    console.log(`Are you sure you want to delete ${select.name}?`);
  };
  return (
    <Grid container mt={1}>
      {fakeData.map((item, index) => (
        <Grid
          key={index}
          className={`${styles.BoxCategory} ${
            item.isAvailable ? null : styles.tableNotAvailable
          }`}
          item
          m={1}
        >
          <Typography width={isMobile ? 200 : '100%'}>
            {index + 1}, {item.name} {item.isAvailable ? '' : ',Đang đặt bàn'}
          </Typography>
          <Stack direction='row' spacing={3} position='absolute' right='4%'>
            <Button
              variant='contained'
              color='error'
              onClick={() => handleClickOpenDelete(item)}
            >
              Xóa
            </Button>
          </Stack>
        </Grid>
      ))}
      <Dialog open={openDLDelete} onClose={() => setOpenDLDelete(false)}>
        <DialogTitle>{'Xóa trường thông tin: ' + select.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn chắc chắn muốn xóa: {select.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDLDelete(false)}>Disagree</Button>
          <Button onClick={confirmDeleteCategory} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
