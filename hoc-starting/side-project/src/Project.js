import React, { Component } from 'react'
import {getCoinMarkets, getPing} from './api'
import CoindCard from './components/CoinCard'
import {Grid } from '@material-ui/core'
import FilterMenu from './components/FilterMenu'

const INITIAL_STATE = {
  coins: [],
  vs_currency: 'eur',
  order: 'market_cap_desc',
  itemPerPage: '25',
  sparkline: false,
  page: '1',
  category: ''
}

export default class Project extends Component {

  constructor(props) {
    super(props)
    
    /* const [order, setOrder] = useState('market_cap_desc')
    const [category, setCategory] = useState('')
    const [itemPerPage, setItemPerPage] = useState('25')
 */
    this.state = {
      ...INITIAL_STATE
    }
  }

  fetchCoinMarket = async () => {
    const { vs_currency, order, itemPerPage, sparkline, page, category,} = this.state
    const params = {
      ...(category && {category}),
      ...(vs_currency && {vs_currency}),
      ...(itemPerPage && {itemPerPage}),
      ...(page && {page}),
      ...(order && {order}),
      ...(sparkline !== undefined && {sparkline})
    }
    const res = await getCoinMarkets(params)
    this.setState({coins: res.data})
  }

  componentDidMount() {
    this.fetchCoinMarket()
  }

  handleChange = (e) => {
    const {value, name} = e.target;
    this.setState(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  resetFilters = () => {
    this.setState(INITIAL_STATE, () => {
      this.fetchCoinMarket()
    })
  }

  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FilterMenu
             handleChange={this.handleChange} 
             order={this.state.order}
             category={this.state.category}
             itemPerPage={this.state.itemPerPage}
             fetchCoin={this.fetchCoinMarket}
             resetFilters={this.resetFilters}
            />
        </Grid>
        {
          this.state.coins.map( (coin)=> {
            return (
              <Grid item xs={12} md={6} lg={4}>
              <CoindCard  {...coin} key={coin.id} />
              </Grid>
            )
            
          })
        }
      </Grid>
    )
  }
}
