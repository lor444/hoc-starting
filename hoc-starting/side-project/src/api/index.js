import { ENDPOINTS } from "../constants/endpoint";
import axios from 'axios'

export const getPing = () => {
  axios.get(ENDPOINTS.PING)
    .then(res => {
      console.log('res ping', res)
    })
    .catch(err => {
      console.error(err)
    })
}

export const getCoinMarkets = (params) => {
  return axios.get(ENDPOINTS.MARKETS, { params })
    .then(res => {
      return res
    })
    .catch(err => {
      console.error('getCoinMarketsError', err)
    })
}

export const getCategoryList  = () => {
  return axios.get(ENDPOINTS.CATEGORY_LIST)
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err)
    })
}