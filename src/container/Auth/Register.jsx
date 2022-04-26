import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Slide,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link as LinkRouter, useNavigate } from 'react-router-dom';
import AuthAPI from '../../API/AuthAPI';
import logo from '../../favicon.ico';

export default function Register() {
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState('');
  const [validAPI, setValidAPI] = React.useState('');
  const [hidePass, setHidePass] = React.useState(false);
  const [alert, setAlert] = React.useState(false);

  const openAlert = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  const navigation = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      login: email,
      password: password,
    };
    const res = await AuthAPI.register(data);
    console.log(res);
    if (!res.status) {
      setValidAPI('');
      setToken(res.token);
      const data1 = {
        name: lastName,
        email: email,
        phoneNumber: phoneNumber,
      };
      const res1 = await AuthAPI.CreateCustomer(data1, res.token);
      console.log(res1);
      openAlert();
    } else if (res.status === 403) {
      setValidAPI('Email đã được sử dụng, vui lòng chuyển sang đăng nhập!');
    } else {
      setValidAPI('Lỗi hệ thống, vui lòng liên hệ quản trị viên');
    }
  };
  React.useEffect(() => {
    if (!!sessionStorage.getItem('token') || !!localStorage.getItem('token')) {
      navigation('/');
    }
  }, [token]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        component='main'
        maxWidth='xs'
        sx={{ border: '2px solid gray', borderRadius: 6 }}
      >
        <CssBaseline />
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <img src={logo} style={{ width: '100%' }} alt='logo' />
          </Avatar>
          <Typography component='h1' variant='h5'>
            <p className='p__cormorant'>Đăng ký</p>
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  onChange={(e) => setLastName(e.target.value)}
                  label='Họ và tên'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  label='Số điện thoại'
                  name='lastName'
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  autoComplete='family-name'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email'
                  name='email'
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ mt: 1, width: '100%' }} variant='outlined'>
                  <InputLabel htmlFor='outlined-adornment-password'>
                    Mật khẩu
                  </InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-password'
                    type={hidePass ? 'text' : 'password'}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() => setHidePass(!hidePass)}
                          edge='end'
                        >
                          {hidePass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Mat Khau'
                  />
                </FormControl>
              </Grid>
            </Grid>
            {validAPI && (
              <Typography variant='body2' color='error'>
                {validAPI}
              </Typography>
            )}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng ký
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <LinkRouter to='/login'>
                  <Link variant='body2'>Đã có tài khoản? Đăng nhập!</Link>
                </LinkRouter>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Slide direction='left' in={alert} mountOnEnter unmountOnExit>
        <Alert
          sx={{ position: 'fixed', top: 100, right: 20 }}
          onClose={() => setAlert(false)}
          severity='success'
        >
          <span
            style={{ fontSize: 18, lineHeight: 1.1 }}
            className='p__cormorant'
          >
            <p>Đăng ký thành công, bạn có thể chuyển sang đăng nhập!</p>
          </span>
        </Alert>
      </Slide>
    </Box>
  );
}
