import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const axiosSecure = axios.create({
  // baseURL: 'https://mediplus-server.vercel.app',
  baseURL: 'http://localhost:5000',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('access-token')}`
  }
})
const useAxiosSecure = () => {
  const navigate = useNavigate()

  useEffect(() => {
    axiosSecure.interceptors.request.use(function (config) {
      // Do something before request is sent
      // const token = localStorage.getItem('access-token')
      // if(token){
      //   config.headers.Authorization = `Bearer ${token}`
      // }
      // console.log(config);
      return config;

    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          //   await logOutUser();
          navigate('/signIn')
        }
        return Promise.reject(error)
      }
    )

  }, [navigate])

  return axiosSecure;
};

export default useAxiosSecure;