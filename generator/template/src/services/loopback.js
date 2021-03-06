import axios from 'axios';
import { restApiHost, restApiRoot, port } from './loopback.config.json';

const Storage = window.localStorage;

/**
 * Add a token in the local storage
 * */
function exportTokenToLocalStorage(token) {
  if (Storage) {
    Storage.setItem('loopback-token', JSON.stringify(token));
  }
}

/**
 * Remove token from local storage
 */
function removeTokenFromLocalStorage() {
  if (Storage) {
    Storage.removeItem('loopback-token');
  }
}

function addTokenFromLocalStorage(http) {
  const token = Storage && Storage.getItem('loopback-token');
  if (token) http.setToken(JSON.parse(token), false);
}

const http = axios.create({
  baseURL: `http://${restApiHost}:${port}${restApiRoot}`,
});

// Current setLoading function
/* eslint-disable no-console */
let setLoading = () => {
  console.warn('[loopback service] setLoadingFunction is not defined');
};

http.setLoadingFunction = (fn) => {
  setLoading = fn;
};

http.setToken = (token, save = true) => {
  http.token = token;
  http.defaults.headers.common.Authorization = token.id;
  if (save) exportTokenToLocalStorage(token);
};

http.removeToken = () => {
  delete http.defaults.headers.common.Authorization;
  removeTokenFromLocalStorage();
};

http.find = (endpoint, filter) => http.get(endpoint, { params: { filter } });

/* Response Interceptors */
const interceptResErrors = (err) => {
  // console.log('error', err);
  try {
    setLoading(
      false,
      err.config.uid || err.response.config.uid,
    );
    err = Object.assign(new Error(), err.response.data.error);
  } catch (e) {
    // Will return err if something goes wrong
  }
  return Promise.reject(err);
};
const interceptResponse = (res) => {
  // console.log('response', res.config);
  setLoading(false, res.config.uid);
  try {
    return res.data;
  } catch (e) {
    return res;
  }
};
http.interceptors.response.use(interceptResponse, interceptResErrors);

// Set storage Token in http if exists
addTokenFromLocalStorage(http);

/* Request Interceptors */
const interceptReqErrors = err => Promise.reject(err);
const interceptRequest = (config) => {
  config.uid = setLoading(true, config.uid);
  // console.log('request', config);
  return config;
};
http.interceptors.request.use(interceptRequest, interceptReqErrors);

export default http;

// Documentation: https://github.com/axios/axios
