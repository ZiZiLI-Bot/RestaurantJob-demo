import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FoodsAPI from '../../../../API/FoodsAPI';
import ImageUploading from 'react-images-uploading';

const fakeData = [
  { id: '1', foodSize: 'S', discount: '0', amount: '2', foodId: '1' },
  {
    id: '2',
    foodSize: 'SS',
    discount: '0',
    amount: '2',
    foodId: '1',
  },
  {
    id: '3',
    foodSize: 'B',
    discount: '0',
    amount: '2',
    foodId: '1',
  },
];

export default function FixFoods() {
  const [expanded, setExpanded] = useState(null);
  const [foodTitle, setFoodTitle] = useState('');
  let { id } = useParams();
  const handleChangeExpanded = (expanded) => {
    setExpanded(expanded);
  };
  useEffect(() => {
    const fetchFoodById = async () => {
      const res = await FoodsAPI.getFoodById(id);
      setFoodTitle(res);
    };
    fetchFoodById();
  }, []);
  return (
    <Container>
      <Grid container>
        <Grid
          item
          xs={12}
          my={3}
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          <Typography variant='h5' textAlign='center' mb={2}>
            Chỉnh sửa thông tin món {foodTitle?.name}
          </Typography>
          {foodTitle && (
            <Box>
              <TextField
                sx={{ m: 3, width: 310 }}
                label='Tên món ăn:'
                variant='standard'
                defaultValue={foodTitle.name}
              />
              <TextField
                sx={{ m: 3, width: 310 }}
                label='Tiêu đề món ăn:'
                variant='standard'
                defaultValue={foodTitle.title}
              />
            </Box>
          )}
          <Box width='100%' display='flex' justifyContent='center'>
            <Button variant='contained' sx={{ my: 2 }}>
              Xác nhận
            </Button>
          </Box>
          <Stack spacing={2}>
            {fakeData.map((item, index) => (
              <AccordionFixFoodDetail
                key={index}
                item={item}
                index={index}
                handleChangeExpanded={handleChangeExpanded}
                expanded={expanded}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

const AccordionFixFoodDetail = ({
  item,
  index,
  handleChangeExpanded,
  expanded,
}) => {
  const [Size, setSize] = useState('');
  const [Amount, setAmount] = useState('');
  const [Discount, setDiscount] = useState('');
  const [images, setImages] = useState([]);
  const maxNumber = 5;

  const onChangeImage = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  return (
    <Accordion
      expanded={expanded == `panel${index + 1}`}
      onChange={() => handleChangeExpanded(`panel${index + 1}`)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Food detail Size: {item.foodSize}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <TextField
            sx={{ m: 2, width: 220 }}
            label='Size'
            variant='standard'
            defaultValue={item.foodSize}
            onChange={(e) => setSize(e.target.value)}
          />
          <TextField
            sx={{ m: 2, width: 220 }}
            label='Số lượng'
            variant='standard'
            defaultValue={item.amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            sx={{ m: 2, width: 220 }}
            label='Giá sản phẩm'
            variant='standard'
            defaultValue={item.discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </Box>
        <Typography textAlign='center' my={2}>
          Cập nhật hình ảnh
        </Typography>
        <ImageUploading
          multiple
          value={images}
          onChange={onChangeImage}
          maxNumber={maxNumber}
        >
          {({
            imageList,
            onImageUpload,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <Box display='flex' alignItems='center' flexDirection='column'>
              <Stack
                width={350}
                height={100}
                sx={{
                  border: '1px dashed #fff',
                  cursor: 'pointer',
                }}
                onClick={onImageUpload}
                {...dragProps}
              >
                <Typography textAlign='center' mt={2} sx={{ opacity: 0.5 }}>
                  {isDragging ? 'Thả' : 'Bấm để thêm hoặc kéo hình ảnh vào đây'}
                </Typography>
              </Stack>
              {images && (
                <Box
                  display='flex'
                  width={350}
                  sx={{ border: '1px dashed #fff', overflowX: 'auto' }}
                >
                  {imageList?.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image.dataURL}
                        style={{ margin: 5 }}
                        alt='ImageUpload'
                        width='100'
                        height='100'
                      />
                      <div>
                        <Button
                          size='small'
                          onClick={() => onImageUpdate(index)}
                        >
                          Update
                        </Button>
                        <Button
                          size='small'
                          color='error'
                          onClick={() => onImageRemove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </Box>
              )}
            </Box>
          )}
        </ImageUploading>
      </AccordionDetails>
    </Accordion>
  );
};
