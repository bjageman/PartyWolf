import axios from 'axios';
import { myConfig } from '../../config.js';

url = myConfig.API_URL + "/api/v" + myConfig.API_VERSION

var axiosRequest = axios.create({
  baseURL: url,
  timeout: 2000,
  headers: {
      'Content-Type': 'application/json',
  }
});

export function verifyData(response){
  if (response.status == 200){
      return true
  }else{
      return false
  }
}

export function postDataApi(url, postData, token = null) {
    if (token){
        axiosRequest.defaults.headers.common['Authorization'] = 'JWT ' + token;
    }
    return axiosRequest.post(url, postData)
    .then(function (response) {
        return response;
    })
    .catch(function (error) {
        console.log(error);
        return error.response
    });
}

export function fetchDataApi(url, token = null) {
    if (token){
        axiosRequest.defaults.headers.common['Authorization'] = 'JWT ' + token;
    }
    return axiosRequest.get(url)
    .then(function (response) {
        return response;
        })
    .catch(function (error) {
        console.log(error);
        return error.response;
    });
}
