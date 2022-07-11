import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `https://node-friendfoods.herokuapp.com`
})