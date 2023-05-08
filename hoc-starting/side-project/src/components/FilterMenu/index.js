import React, {useState, useEffect} from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import {Grid, FormControl, MenuItem, InputLabel, Select} from '@material-ui/core'
import { getCategoryList } from '../../api';
import './style.css'

const ITEM_PER_PAGE_SELECT_ITEMS = ['25', '50', '100', '150', '200', '250']
const ORDER_SELECT_ITEMS = 
  [
    {value: 'market_cap_desc', label: 'Market Cap Desc'}, 
    {value: 'gecko_desc', label: 'Gecko Desc'}, 
    {value: 'gecko_asc', label: 'Gecko Asc'}, 
    {value: 'volume_asc', label: 'Volume Asc'}, 
    {value: 'volume_desc', label: 'Volume Desc'}, 
    {value: 'id_ac', label: 'Id Asc'}, 
    {value: 'id_desc', label: 'IdDesc'}, 
  ]



function FilterMenu({order, category, itemPerPage, handleChange, fetchCoin, resetFilters}) {

  const [categoryList, setCategoryList] = useState([])

  const fetchCategoryList = async () => {
    const res = await getCategoryList()
    setCategoryList(res.data)
  }

  useEffect( () => {
    fetchCategoryList()
  }, [])


  return (
    <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<MenuIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div >
            <Typography >Filters</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails >
          <Grid item xs={12} md={6} lg={4}>
            <FormControl variant="outlined" style={{width: '100%'}}>
              <InputLabel id="order-select">Order</InputLabel>
              <Select
                labelId="order-select"
                value={order}
                onChange={handleChange}
                label="Order"
                name="order"
              >
                {
                  ORDER_SELECT_ITEMS.map((el, i) => <MenuItem key={i} value={el.value}>{el.label}</MenuItem>)
                }
                
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <FormControl variant="outlined" style={{width: '100%'}}>
              <InputLabel id="category-select">Category</InputLabel>
              <Select
                labelId="category-select"
                value={category}
                onChange={handleChange}
                label="Category"
                name="category"
              >
                {
                  categoryList.map((el, i) => <MenuItem key={i} value={el.category_id}>{el.name}</MenuItem>)
                }
                
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <FormControl variant="outlined" style={{width: '100%'}}>
              <InputLabel id="item-per-page">Item per page</InputLabel>
              <Select
                labelId="item-per-select"
                value={itemPerPage}
                onChange={handleChange}
                label="Item per page"
                name="itemPerPage"
              >
                {
                  ITEM_PER_PAGE_SELECT_ITEMS.map((el, i) => <MenuItem key={i} value={el}>{el}</MenuItem>)
                }
                
              </Select>
            </FormControl>
          </Grid>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button variant="outlined" size="small" onClick={resetFilters}>Reset filters</Button>
          <Button variant="contained" size="small" color="primary" onClick={fetchCoin}>
            Apply filters
          </Button>
        </AccordionActions>
      </Accordion>
  )
}

export default FilterMenu
