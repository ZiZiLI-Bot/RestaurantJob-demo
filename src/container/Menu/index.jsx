import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import FoodImage1 from '../../assets/FoodImage1.jpg';
import FoodImage2 from '../../assets/FoodImage2.jpg';
import FoodImage3 from '../../assets/FoodImage3.jpg';
import FoodImage4 from '../../assets/FoodImage4.jpg';
import FoodImage5 from '../../assets/FoodImage5.jpg';
import FoodImage6 from '../../assets/FoodImage6.jpg';
import SubHeading from '../../components/SubHeading/SubHeading';
import styles from './menu.module.css';

const fakeData = [
  {
    name: 'Mì Spaghetti',
    price: '10000',
    discount: '10',
    description: 'lorem ipsum dolor sit amet',
    image: FoodImage1,
  },
  {
    name: 'Bánh bò',
    price: '10000',
    discount: '15',
    description: 'lorem ipsum dolor sit amet',
    image: FoodImage2,
  },
  {
    name: 'Bánh gạo',
    price: '10000',
    discount: '0',
    description: 'lorem ipsum dolor sit amet',
    image: FoodImage3,
  },
  {
    name: 'Lợn luộc',
    price: '20000',
    discount: '0',
    description: 'lorem ipsum dolor sit amet',
    image: FoodImage4,
  },
  {
    name: 'Gà rán',
    price: '30000',
    discount: '30',
    description: 'lorem ipsum dolor sit amet',
    image: FoodImage5,
  },
  {
    name: 'Khổ qua',
    price: '10000',
    discount: '0',
    description: 'lorem ipsum dolor sit amet',
    image: FoodImage6,
  },
];

export default function Menu() {
  const discount = (price, discount) => {
    return (parseInt(price, 10) * (100 - parseInt(discount, 10))) / 100;
  };
  return (
    <>
      <Box className={styles.HeaderImage}>
        <p className='headtext__cormorant'>Menu</p>
        <SubHeading title='Thưởng thức các món ăn tuyệt vời!' />
      </Box>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <p className='p__cormorant' style={{ marginTop: 30 }}>
          Tất cả các món được chọn lọc và thiết kế từ nhà hàng
        </p>
      </Box>
      <Container>
        <Grid container spacing={5} mt={4}>
          {fakeData.map((item, index) => (
            <Grid item key={index} xs={4}>
              <Card
                className={styles.CardFood}
                sx={{ minHeight: 450, position: 'relative' }}
              >
                {item.discount !== '0' ? (
                  <Box className={styles.discountIcon}>{item.discount}%</Box>
                ) : null}
                <CardMedia
                  className={styles.CardFoodMedia}
                  component='img'
                  height='220'
                  image={item.image}
                  alt='green iguana'
                />
                <CardContent>
                  <p className='p__cormorant'>{item.name}</p>
                  <Typography
                    variant='body1'
                    color='text.secondary'
                    mt={1}
                    height={40}
                  >
                    {item.description}
                  </Typography>
                  <p className={`p__cormorant ${styles.price}`}>
                    {item.discount != '0'
                      ? discount(item.price, item.discount) + ' VND'
                      : item.price + ' VND'}
                  </p>
                  <p
                    className={`p__cormorant ${styles.discountText} ${
                      item.discount != '0' ? styles.discountPrice : ''
                    }`}
                  >
                    {item.discount != '0' ? item.price + ' VND' : ''}
                  </p>
                </CardContent>
                <CardActions>
                  <Button
                    size='small'
                    sx={{ position: 'absolute', bottom: 10 }}
                  >
                    <p style={{ fontSize: '17px' }} className='p__cormorant'>
                      Xem thêm
                    </p>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Stack my={4} display='flex' alignItems='center'>
          <Pagination count={10} />
        </Stack>
      </Container>
    </>
  );
}
