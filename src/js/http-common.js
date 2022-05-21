import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `http://friendfood.xyz/`,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
  }
})