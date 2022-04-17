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
import logo from '../../favicon.ico';
import AuthAPI from '../../API/AuthAPI';

export default function Register() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState('');
  const [validAPI, setValidAPI] = React.useState('');
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
      if (savePass) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', res.username);
        localStorage.setItem('role', res.role);
        setToken(res.token);
      }
      sessionStorage.setItem('token', res.token);
      sessionStorage.setItem('name', res.username);
      sessionStorage.setItem('role', res.role);
      setToken(res.token);
      if (res.role === 'ROLE_ADMIN') {
        navigation('/admin');
      } else {
        navigation('/');
      }
    } else if (res.status === 403) {
      setValidAPI('Tài khoản hoặc mật khẩu không đúng');
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
                  onChange={(e) => setFirstName(e.target.value)}
                  label='Họ và tên đệm'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  label='Tên'
                  name='lastName'
                  onChange={(e) => setLastName(e.target.value)}
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
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Mật khẩu'
                  type='password'
                  id='password'
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete='new-password'
                />
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
    </Box>
  );
}
