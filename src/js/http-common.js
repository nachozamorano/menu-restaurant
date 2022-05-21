import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `https://friendfoods.herokuapp.com/`,
})