import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components';
import { HomePage } from './container';
import AdminPage from './container/Admin';
import FixFoods from './container/Admin/Foods/FixFood';
import NewFood from './container/Admin/Foods/NewFood';
import Login from './container/Auth/Login';
import Register from './container/Auth/Register';
import BookTable from './container/BookTable';
import Cart from './container/Cart';
import Footer from './container/HomePage/Footer/Footer';
import Menu from './container/Menu';
import DetailFood from './container/Menu/DetailFood';
import Favorite from './container/HomePage/Favorite/Favorite';
import UserSettings from './container/User';

const MuiTheme = createTheme({
  typography: {
    allVariants: {
      color: 'white',
    },
  },
  palette: {
    mode: 'dark',
  },
});

const App = () => (
  <ThemeProvider theme={MuiTheme}>
    <Navbar />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/book-table' element={<BookTable />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='/admin/foods/fix-food/:id' element={<FixFoods />} />
      <Route path='/admin/foods/new-food' element={<NewFood />} />
      <Route path='/menu' element={<Menu />} />
      <Route path='/menu/:id' element={<DetailFood />} />
      <Route path='/favorite' element={<Favorite />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/user-settings' element={<UserSettings />} />
    </Routes>
    <Footer />
  </ThemeProvider>
);

export default App;
