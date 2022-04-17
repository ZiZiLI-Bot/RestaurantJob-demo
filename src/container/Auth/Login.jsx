import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link as LinkRouter, useNavigate } from 'react-router-dom';
import AuthAPI from '../../API/AuthAPI';
import logo from '../../favicon.ico';

export default function Login() {
  const [savePass, setSavePass] = React.useState(false);
  const [validAPI, setValidAPI] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState('');
  const navigation = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      login: email,
      password: password,
    };
    const res = await AuthAPI.login(data);
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
    console.log(res);
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
            my: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <img src={logo} style={{ width: '100%' }} alt='logo' />
          </Avatar>
          <Typography component='h1' variant='h5'>
            <p className='p__cormorant'>Đăng nhập</p>
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='email'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='Mật khẩu'
              label='Mật khẩu'
              type='password'
              id='password'
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='current-password'
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Nhớ mật khẩu'
              onChange={(e) => setSavePass(e.target.checked)}
            />
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
              Đăng nhập
            </Button>
            <Grid container>
              <Grid item>
                <LinkRouter to='/register'>
                  <Link variant='body2'>
                    {'Chưa có tài khoản? Đăng ký ngay!'}
                  </Link>
                </LinkRouter>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
