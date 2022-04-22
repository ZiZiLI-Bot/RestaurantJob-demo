import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Badge, Button, Divider, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BookTableAPI from '../../API/BookTableAPI';
import images from '../../constants/images';
import getAuth, {
  getKey,
  logout as logoutFunction,
} from '../../Features/getAuth';
import './Navbar.css';

const Navbar = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const [Cart, setCart] = React.useState(0);
  const [userLogin, setUserLogin] = React.useState(getAuth());
  useEffect(() => {
    const fetchData = async () => {
      const res = await BookTableAPI.getUserBookTable();
      setCart(res.length);
    };
    fetchData();
  }, [userLogin]);
  const logout = () => {
    logoutFunction();
    setUserLogin(getAuth());
    navigation('/');
  };
  useEffect(() => {
    setUserLogin(getAuth());
  }, [location]);
  return (
    <nav className='app__navbar'>
      <div className='app__navbar-logo'>
        <img src={images.gericht} alt='app__logo' />
      </div>
      <ul className='app__navbar-links'>
        <li className='p__opensans'>
          <Link to='/' className='p__opensans'>
            Home
          </Link>
        </li>
        <li className='p__opensans'>
          <a href='/#about'>About</a>
        </li>
        <li className='p__opensans'>
          <Link to='/menu'>Menu</Link>
        </li>
        <li className='p__opensans'>
          <a href='/#awards'>Awards</a>
        </li>
        <li className='p__opensans'>
          <a href='/#contact'>Contact</a>
        </li>
      </ul>
      <div style={{ position: 'relative', top: 4, right: 10 }}>
        {userLogin && (
          <Link to='/cart'>
            <Badge color='secondary' badgeContent={Cart}>
              <LocalGroceryStoreOutlinedIcon
                sx={{ color: 'white', cursor: 'pointer' }}
              />
            </Badge>
          </Link>
        )}
      </div>
      <div className='app__navbar-login'>
        {userLogin ? (
          <a className='userLogin'>
            <p className='p__opensans' style={{ padding: '0 20px' }}>
              Xin chào {getKey('name')}!
            </p>
            <Stack
              style={{
                width: '100%',
                background: 'transparent',
                padding: '0 10px',
                zIndex: 100,
              }}
              className='loginOptions'
              spacing={2}
            >
              <Link to='/favorite' className='options'>
                <Typography textAlign='start'>Món ăn ưa thích</Typography>
              </Link>
              <Link to='/user-settings' className='options'>
                <Typography textAlign='start'>Thông tin cá nhân</Typography>
              </Link>
              {getKey('role') === 'ROLE_ADMIN' ? (
                <>
                  <Link to='/admin' className='options'>
                    <Typography textAlign='start'>Trang quản lý</Typography>
                  </Link>
                </>
              ) : (
                <>
                  <Link to='/favorite' className='options'>
                    <Typography mt={1} textAlign='start'>
                      Món ăn ưa thích
                    </Typography>
                  </Link>
                  <Typography className='options' textAlign='start'>
                    Hello
                  </Typography>
                </>
              )}
              <Divider />
              <Button
                onClick={logout}
                endIcon={<LogoutIcon />}
                variant='outlined'
                color='error'
                bottom={0}
              >
                Đăng xuất
              </Button>
            </Stack>
          </a>
        ) : (
          <Link to='/login'>
            <p className='p__opensans'>Log In / Registration</p>
          </Link>
        )}
        <div />
        <Link to='/book-table' className='p__opensans'>
          Book Table
        </Link>
      </div>
      <div className='app__navbar-smallscreen'>
        <GiHamburgerMenu
          color='#fff'
          fontSize={27}
          onClick={() => setToggleMenu(true)}
        />
        {toggleMenu && (
          <div className='app__navbar-smallscreen_overlay flex__center slide-bottom'>
            <MdOutlineRestaurantMenu
              fontSize={27}
              className='overlay__close'
              onClick={() => setToggleMenu(false)}
            />
            <ul className='app__navbar-smallscreen_links'>
              <li>
                <a href='#home' onClick={() => setToggleMenu(false)}>
                  Home
                </a>
              </li>
              <li>
                <a href='#about' onClick={() => setToggleMenu(false)}>
                  About
                </a>
              </li>
              <li>
                <a href='#menu' onClick={() => setToggleMenu(false)}>
                  Menu
                </a>
              </li>
              <li>
                <a href='#awards' onClick={() => setToggleMenu(false)}>
                  Awards
                </a>
              </li>
              <li>
                <a href='#contact' onClick={() => setToggleMenu(false)}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
