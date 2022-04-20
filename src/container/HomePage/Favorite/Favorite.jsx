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
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";


const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

export default function Favorite() {
  const [FoodsData, setFoodsData] = useState([]);
  const [NumberPage, setNumberPage] = useState(0);
  const [page, setPage] = useState(0);
  const [fetching, setFetching] = useState(false)
  const discount = (price, discount) => {
    return (parseInt(price, 10) * (100 - parseInt(discount, 10))) / 100;
  };
  const handleChangePage = (e, value) => {
    setPage(value - 1);
    window.scrollTo(0, 500);
  };

 const handleDeleteFavorite = async (item) => {
    try{
      const  data = {foodDetailId:String(item.id) }
      await FoodsApi.deleteFavouriteFood(data);
      setFetching(!fetching)
    }catch(err){
      console.log(err);
    }

    const  data = {foodDetailId:String(item.id) }

    console.log(data)
  };

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        page: page,
        size: 6,
      };
      const res = await FoodsApi.getAllFavouriteFood(params);
      setFoodsData(res.favouriteFood);
      const res1 = await FoodsApi.getPageFoods();
      setNumberPage(Math.floor(res1.totalElement / 6 + 1));
    };
    fetchData();
  }, [page, fetching]);
  return (
    <>
      <Typography variant="h4" mt={6} mb={-6} textAlign={'center'}>Món ăn của tôi</Typography>
      <Container>
        <Grid container spacing={5} mt={4}>
          {FoodsData?.map((item, index) => (
            <Grid item key={index} md={4} sm={6} xs={12}>
              <Card className={styles.CardFood} sx={{ minHeight: 450, position: "relative" }}>
                {item?.discount !== 0 ?(
                  <Box className={styles.discountIcon}>
                    {item?.discount}%
                  </Box>
                ) : ''}
                <CardMedia
                className={styles.CardFoodMedia}
                component = 'img'
                height="220"
                alt = {item.foodName}
                image = {item?.foodMedias[0].foodUrl}
                >

                </CardMedia>
                <CardContent>
                  <p className="p__cormorant">{item?.foodName}</p>
                  <p className={`p__cormorant ${styles.price}`}>
                    {item.item?.discount != 0
                      ? discount(
                          item?.amount,
                          item.item?.discount
                        ) + " VND"
                      : item?.amount + " VND"}
                  </p>
                  <p
                    className={`p__cormorant ${styles.discountText} ${
                      item.item?.discount != 0
                        ? styles.discountPrice
                        : ""
                    }`}
                  >
                    {item.item?.discount != 0
                      ? item?.amount + " VND"
                      : ""}
                  </p>
                </CardContent>
                <CardActions
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Link to={`/menu/${item.id}`}>
                    <Button
                      size="small"
                      sx={{ position: "absolute", bottom: 10 }}
                    >
                      <p style={{ fontSize: "17px" }} className="p__cormorant">
                        Xem thêm
                      </p>
                    </Button>
                  </Link>
                  <Button sx={{marginTop:'40px'}} onClick={()=>handleDeleteFavorite(item)} >
                    <StyledRating
                      max={1}
                      value = {1}
                      icon={<FavoriteIcon fontSize="inherit" />}
                      emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                      onClick={()=>handleDeleteFavorite(item)}
                    />
                  </Button>
                </CardActions>
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
