//import React, { useState } from "react";
import axios from "axios";
import { CookieValueTypes, getCookie } from "cookies-next";
import { apiBaseURL } from "../constants/constants";


const api = axios.create({
  baseURL: apiBaseURL
 });
 const config= {
    headers:{
      Authorization: 'Bearer ' + getCookie('token')
    }
  };

 export const getCars = async () =>{
//  => api.get(`/car`,config).then(res=>res)
 
    // api.get(`/car`,config).then((res) => {

    //     return res;
    // }).catch(err=>console.log(err));
    return await api.get('/car',config);
  };


  export const getCar = async (id:string|CookieValueTypes|undefined) => {
    // return api.get(`/car/${id}`,config).then((res) => {
    //   return res;
    // });
    return await api.get(`/car/${id}`,config)
  };


  type Car={
    id:string,
        regNo:string,
        email:string,
        userName:string,
        phoneNo:string,
        fromTime:string,
        toTime:string,
        slotNo:string
  }
  export const postCar = async(car:Car)=>{

    return await  api.post('/car', car,config)
  }

  export const putCar=async(car:Car)=>{
    const{id:carId}=car;
    return await api.put(`/car/${carId}`,car,config)
  }

  export const deleteCar = async (id:string|CookieValueTypes|undefined) => {
    // return api.get(`/car/${id}`,config).then((res) => {
    //   return res;
    // });
    return await api.delete(`/car/${id}`,config)
  };