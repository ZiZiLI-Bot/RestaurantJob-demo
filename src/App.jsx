import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components';
import Footer from './container/HomePage/Footer/Footer';
import './App.css';
import { HomePage } from './container';
import BookTable from './container/BookTable';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdminPage from './container/Admin';
import FixFoods from './container/Admin/Foods/FixFood';
import NewFood from './container/Admin/Foods/NewFood';
import Menu from './container/Menu';
import DetailFood from './container/Menu/DetailFood';
import FoodsOrder from './container/BookTable/FoodsOrder';

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
      <Route path='/book-table/:id' element={<FoodsOrder />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='/admin/foods/fix-food/:id' element={<FixFoods />} />
      <Route path='/admin/foods/new-food' element={<NewFood />} />
      <Route path='/menu' element={<Menu />} />
      <Route path='/menu/:id' element={<DetailFood />} />
    </Routes>
    <Footer />
  </ThemeProvider>
);

export default App;
