import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FoodsAPI from '../../../API/FoodsAPI';
import styles from '../Categories/Categories.module.css';
import MenuIcon from '@mui/icons-material/Menu';

export default function FoodsAdmin() {
  const [FoodsData, setFoodsData] = useState([]);
  const [openDLDelete, setOpenDLDelete] = useState(false);
  const [select, setSelect] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isMobile = useMediaQuery('(max-width:600px)');
  const confirmDeleteCategory = async () => {
    console.log(select);
  };
  const handleClickOpenDelete = (item) => {
    setSelect(item);
    setOpenDLDelete(true);
    console.log(select);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await FoodsAPI.getAllFoods();
      setFoodsData(res);
    };
    fetchData();
  }, []);
  return (
    <Grid container mt={1}>
      {FoodsData?.map((item, index) => (
        <Grid key={item.id} className={styles.BoxCategory} item m={1}>
          <Typography width={isMobile ? 200 : '100%'}>
            {index + 1}, {item.name}
          </Typography>
          <MenuIcon
            id='basic-button'
            sx={{ fontSize: 36 }}
            className={styles.IconMenu}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          />
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <Stack m={1} spacing={1}>
              <Button size='small' variant='contained'>
                Thêm chi tiết
              </Button>
              <Link to={`/admin/foods/fix-food/${item.id}`}>
                <Button fullWidth size='small' variant='contained'>
                  Sửa
                </Button>
              </Link>
              <Button
                size='small'
                variant='contained'
                color='error'
                onClick={() => handleClickOpenDelete(item)}
              >
                Xóa
              </Button>
            </Stack>
          </Menu>
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
