import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ImageUploading from 'react-images-uploading';

export default function NewFood() {
  const [addDetail, setAddDetail] = useState([]);
  const [updateAll, setUpdateAll] = useState(false);
  return (
    <Container>
      <Grid container>
        <Grid
          item
          xs={12}
          my={2}
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          <Typography variant='h5' textAlign='center' mb={2}>
            Thêm món mới
          </Typography>
          <Box>
            <TextField
              sx={{ m: 3, width: 310 }}
              label='Tên món ăn:'
              variant='standard'
            />
            <TextField
              sx={{ m: 3, width: 310 }}
              label='Tiêu đề món ăn:'
              variant='standard'
            />
          </Box>
          <Typography variant='h5' mt={4}>
            Thêm chi tiết món ăn
          </Typography>
          {addDetail.map((item, index) => (
            <AddDetail key={index} i={index} updateAll={updateAll} />
          ))}
          <Box mt={3}>
            <Button
              variant='contained'
              sx={{ mr: 3 }}
              onClick={() => setAddDetail((preState) => [...preState, 1])}
            >
              Thêm chi tiết
            </Button>
            {addDetail[0] && (
              <Button variant='contained' onClick={() => setUpdateAll(true)}>
                Xác nhận
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

const AddDetail = ({ i, updateAll }) => {
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [discount, setDiscount] = useState('');
  const [images, setImages] = useState([]);
  const maxNumber = 5;
  useEffect(() => {
    if (updateAll) {
      console.log('updateAll ' + i);
    }
  }, [updateAll]);
  const onChangeImage = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  return (
    <Box>
      <TextField variant='standard' label='Size' sx={{ m: 3, width: 200 }} />
      <TextField variant='standard' label='Giá' sx={{ m: 3, width: 200 }} />
      <TextField
        variant='standard'
        label='Số lượng'
        sx={{ m: 3, width: 200 }}
      />
      <TextField
        variant='standard'
        label='Giảm giá'
        sx={{ m: 3, width: 200 }}
      />
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
                      <Button size='small' onClick={() => onImageUpdate(index)}>
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
    </Box>
  );
};
