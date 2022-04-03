import {
  Container,
  Grid,
  Typography,
  TextField,
  Stack,
  Box,
  Button,
  useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import { MobileTimePicker } from '@mui/lab';
import styles from './BookTable.module.css';
import TableBarIcon from '@mui/icons-material/TableBar';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';

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

export default function BookTable() {
  const [OrderDate, setOrderDate] = useState(new Date());
  const [OrderTime, setOrderTime] = useState('2018-01-01T00:00:00.000Z');
  const [SelectedTable, setSelectedTable] = useState([]);
  const [Order, setOrder] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <p className='headtext__cormorant' variant='h4'>
            Book a Table
          </p>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <Stack mt={3} direction='row' spacing={2}>
              <Box>
                <MobileDatePicker
                  label='Chọn ngày đặt'
                  inputFormat='DD/MM/YYYY'
                  value={OrderDate}
                  onChange={(newValue) => setOrderDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
              <Box>
                <MobileTimePicker
                  label='Chọn giờ đặt'
                  value={OrderTime}
                  onChange={(newValue) => setOrderTime(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
            </Stack>
          </LocalizationProvider>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' onClick={() => setOrder(true)}>
              Xác nhận thời gian trên
            </Button>
          </Box>
          {Order && (
            <Stack spacing={2}>
              <Typography variant='h5'>Chọn bàn còn trống:</Typography>
              <Box style={{ backgroundColor: '#36C7D0', borderRadius: 10 }}>
                {SelectedTable[0] ? (
                  <Typography
                    variant='h5'
                    mt={2}
                    textAlign='center'
                    color='black'
                  >
                    Đang chọn {SelectedTable.join(', ')}
                  </Typography>
                ) : null}
                <Grid p={3} container>
                  {fakeData.map((item) => (
                    <Box
                      key={item.name}
                      m={isMobile ? 2 : 4}
                      className={
                        item.isAvailable
                          ? `${styles.TableIlu}`
                          : `${styles.TableIlu} ${styles.disabled}`
                      }
                      textAlign='center'
                      onClick={() =>
                        setSelectedTable(
                          item.isAvailable && !SelectedTable.includes(item.name)
                            ? (preState) => [...preState, item.name]
                            : (preState) => [
                                ...preState.filter((i) => i !== item.name),
                              ],
                        )
                      }
                    >
                      {SelectedTable.includes(item.name) ? (
                        <DoneOutlineRoundedIcon
                          className={styles.doneOutlineRounded}
                        />
                      ) : null}
                      <Typography color='Black'>{item.name}</Typography>
                      <TableBarIcon sx={{ fontSize: 50, mt: 1 }} />
                      <Typography color='Black' variant='subtitle2'>
                        Số Ghế: {item.capacity}
                      </Typography>
                      <Typography
                        color='Black'
                        mt={3}
                        className={styles.OrderNow}
                      >
                        Order Now!
                      </Typography>
                    </Box>
                  ))}
                </Grid>
              </Box>
              {SelectedTable[0] && (
                <>
                  <Typography variant='h5'>Thông tin khách hàng:</Typography>
                  <Stack justifyContent='space-between' direction='row'>
                    <TextField
                      sx={{ width: '30%' }}
                      id='HVT'
                      label='Họ và tên'
                      variant='standard'
                      required
                    />
                    <TextField
                      sx={{ width: '30%' }}
                      id='SDT'
                      label='Số điện thoại'
                      variant='standard'
                      required
                    />
                    <TextField
                      sx={{ width: '30%' }}
                      id='Email'
                      label='Email'
                      variant='standard'
                    />
                  </Stack>
                  <Box
                    sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
                  >
                    <Button variant='contained'>Đặt bàn</Button>
                  </Box>
                </>
              )}
            </Stack>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
