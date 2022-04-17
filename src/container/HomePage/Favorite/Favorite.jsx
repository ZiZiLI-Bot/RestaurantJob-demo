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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import FoodsApi from "../../../API/FoodsAPI";
import MenuHeaderImage from '../../../assets/MenuHeader.jpg'
import SubHeading from "../../../components/SubHeading/SubHeading";
import styles from "./favorite.module.css";


export default function Favorite() {
  const [FoodsData, setFoodsData] = useState([]);
  const [NumberPage, setNumberPage] = useState(0);
  const [page, setPage] = useState(0);
  const discount = (price, discount) => {
    return (parseInt(price, 10) * (100 - parseInt(discount, 10))) / 100;
  };
  const handleChangePage = (e, value) => {
    setPage(value - 1);
    window.scrollTo(0, 500);
  };
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        page: page,
        size: 6,
      };
      const res = await FoodsApi.getAllFoods(params);
      setFoodsData(res);
      const res1 = await FoodsApi.getPageFoods();
      setNumberPage(Math.floor(res1.totalElement / 6 + 1));
    };
    fetchData();
  }, [page]);
  return (
    <>
      <Typography variant="h4" mt={6} mb={-6} textAlign={'center'}>Món ăn của tôi</Typography>
      <Container>
        <Grid container spacing={5} mt={4}>
          {FoodsData?.map((item, index) => (
            <Grid item key={index} md={4} sm={6} xs={12}>
              <Card
                className={styles.CardFood}
                sx={{ minHeight: 450, position: "relative" }}
              >
                {item.foodDetails[0]?.discount != 0 ? (
                  <Box className={styles.discountIcon}>
                    {item.foodDetails[0]?.discount}%
                  </Box>
                ) : null}
                <CardMedia
                  className={styles.CardFoodMedia}
                  component="img"
                  height="220"
                  image={item.foodDetails[0]?.foodMedias[0]?.foodUrl}
                  alt={item.title}
                />
                <CardContent>
                  <p className="p__cormorant">{item.name}</p>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    mt={1}
                    height={40}
                  >
                    {item.title}
                  </Typography>
                  <p className={`p__cormorant ${styles.price}`}>
                    {item.foodDetails[0]?.discount != 0
                      ? discount(
                          item.foodDetails[0]?.amount,
                          item.foodDetails[0]?.discount
                        ) + " VND"
                      : item.foodDetails[0]?.amount + " VND"}
                  </p>
                  <p
                    className={`p__cormorant ${styles.discountText} ${
                      item.foodDetails[0]?.discount != 0
                        ? styles.discountPrice
                        : ""
                    }`}
                  >
                    {item.foodDetails[0]?.discount != 0
                      ? item.foodDetails[0]?.amount + " VND"
                      : ""}
                  </p>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Stack my={4} display="flex" alignItems="center">
          <Pagination count={NumberPage} onChange={handleChangePage} />
        </Stack>
      </Container>
    </>
  );
}
