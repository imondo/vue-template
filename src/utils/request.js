import axios from 'axios';
import qs from 'qs';
import { message } from './message';
import store from '@/store';

const request = axios.create({
  baseURL: '',
  withCredentials: true
});

request.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = store.getters.token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

request.interceptors.response.use(
  response => {
    store.dispatch('loading/CancalLoading');
    console.log('res===>', response);
    const {
      data: { code, data, msg },
      status
    } = response;
    if (code === 200) {
      return data;
    }
    message.err(msg);
    return Promise.reject(data);
  },
  err => {
    return Promise.reject(err);
  }
);

export function get({ url, data = {} }) {
  return request.get(url, { params: data });
}

export function post({ url, data = {} }) {
  return request.post(url, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    withCredentials: true,
    transformRequest: [
      data => {
        return qs.stringify(data);
      }
    ]
  });
}

export function postJson({ url, data = {} }) {
  return request.post(url, data, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  });
}

export function del({ url, data = {} }) {
  return request.delete(url, { data });
}

export default {
  install(app) {
    app.provide('request', { get, post, postJson, del });
  }
};
