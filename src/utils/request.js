import axios from 'axios';
// import qs from 'qs';

axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    return Promise.reject(err);
  }
);

export function get({ url, data = {} }) {
  return axios.get(url, { params: data });
}

export function post({ url, data = {} }) {
  return axios.get(url, { data });
}
