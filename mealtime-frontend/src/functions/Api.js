import axios from 'axios'
import { getToken, isAuthenticated } from './Auth';
const API_URL = process.env.API_URL || 'http://127.0.0.1:3000/api/v1/';

function getHeaders(token) {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Token': token
  };
}

export function apiGet(endpoint, date, token = getToken()) {
  isAuthenticated()
  const options = {
    method: 'GET',
    headers: getHeaders(token),
    day: date
  }
  if (endpoint.includes("?")) {
    return axios.get(`${API_URL}${endpoint}&Token=` + token, options);
  }
  else {
    return axios.get(`${API_URL}${endpoint}?Token=` + token, options);
  }
}

export function apiDelete(endpoint, token = getToken()) {
  isAuthenticated()
  const options = {
    method: 'DELETE',
    headers: getHeaders(token)
  }

  if (endpoint.includes("?")) {
    return axios.delete(`${API_URL}${endpoint}&Token=` + token, options);
  }
  else {
    return axios.delete(`${API_URL}${endpoint}?Token=` + token, options);
  }
}

export function apiPost(endpoint, data = {}, token = getToken()) {
  if(endpoint != 'login') isAuthenticated()
  const options = {
    method: 'POST',
    headers: getHeaders(token),
    body: data
  }
  if (endpoint.includes("?")) {
    return axios.post(`${API_URL}${endpoint}&Token=` + token, options);
  }
  else {
    return axios.post(`${API_URL}${endpoint}?Token=` + token, options);
  }
}

export function apiPatch(endpoint, param, data = {}, token = getToken()) {
  isAuthenticated()
  const options = {
    method: 'PATCH',
    headers: getHeaders(token),
    body: data,
    param: param
  }
  if (endpoint.includes("?")) {
    return axios.patch(`${API_URL}${endpoint}&Token=` + token, options);
  }
  else {
    return axios.patch(`${API_URL}${endpoint}?Token=` + token, options);
  }
}
