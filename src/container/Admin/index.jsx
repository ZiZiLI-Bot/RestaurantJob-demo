import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryAPI from '../../API/CategoriesAPI';
import CategoriesAdmin from './Categories';
import FoodsAdmin from './Foods';

export default function AdminPage() {
  const [render, setRender] = useState(1);
  const [expanded, setExpanded] = useState('panel1');
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [addCategory, setAddCategory] = useState('');

  const handleChange = (panel) => (isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const confirmAddCategory = async () => {
    setOpenAddCategory(false);
    const category = {
      name: addCategory,
      deleteflag: null,
    };
    const res = await CategoryAPI.createCategory(category);
    console.log(res);
  };

  return (
    <Grid container spacing={5} mt={1}>
      <Grid item md={3} xs={12}>
        <Stack spacing={2}>
          <Typography textAlign='center' variant='h5' mb={2}>
            Danh mục
          </Typography>
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              onClick={() => setRender(1)}
            >
              <Typography>Thể loại</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button color='success' onClick={() => setOpenAddCategory(true)}>
                Thêm thể loại
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel2a-content'
              onClick={() => setRender(2)}
            >
              <Typography>Đồ ăn</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Link to='/admin/foods/new-food'>
                <Button color='success'>Thêm Món</Button>
              </Link>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Grid>
      <Grid item md={9} xs={12}>
        <Typography variant='h5' textAlign='center'>
          Quản lý
        </Typography>
        {render === 1 && <CategoriesAdmin />}
        {render === 2 && <FoodsAdmin />}
      </Grid>
      {/* Dialog for add new category */}
      <Dialog open={openAddCategory} onClose={() => setOpenAddCategory(false)}>
        <DialogTitle>{'Thêm thể loại mới: '}</DialogTitle>
        <DialogContent>
          <TextField
            label='Tên thể loại'
            fullWidth
            variant='standard'
            onChange={(e) => setAddCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddCategory(false)}>Disagree</Button>
          <Button onClick={confirmAddCategory} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
