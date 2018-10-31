import axios from 'axios'
import { getToken } from './Auth';
const API_URL = process.env.API_URL || 'http://127.0.0.1:3000/api/v1/';

function getHeaders(token) {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Token': token
  };
}

export function apiGet(endpoint, token = getToken()) {
  const options = {
    method: 'GET',
    headers: getHeaders(token)
  }
  return axios.get(`${API_URL}${endpoint}/`, options);
}

export function apiPost(endpoint, data = {}, token = getToken()) {
  const options = {
    method: 'POST',
    headers: getHeaders(token),
    body: data
  }
  console.log(options)

  return axios.post(`${API_URL}${endpoint}/`, options);
}