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

export function apiGet (endpoint, date, token = getToken()) {
  const options = {
    method: 'GET',
    headers: getHeaders(token),
    day: date
  }
  return axios.get(`${API_URL}${endpoint}/`, options);
}

export function apiDelete (endpoint, token = getToken()) {
  // console.log(token)
  const options = {
    method: 'DELETE',
    headers: getHeaders(token)
  }
  
  return axios.delete(`${API_URL}${endpoint}/`, options)
}

export function apiPost (endpoint, data = {}, token = getToken()) {
  const options = {
    method: 'POST',
    headers: getHeaders(token),
    body: data
  }
  return axios.post(`${API_URL}${endpoint}/`, options);
}

export function apiPatch(endpoint, param, data = {}, token = getToken()) {
  const options = {
    method: 'PATCH',
    headers: getHeaders(token),
    body: data,
    param: param
  }

  console.log(options)
  return axios.patch(`${API_URL}${endpoint}/`, options);
}