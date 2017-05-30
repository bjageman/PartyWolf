import axios from 'axios';

var axiosRequest = axios.create({
  baseURL: "127.0.0.1:5000",
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
