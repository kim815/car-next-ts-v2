import React, { useEffect, useState } from "react";
import {v4 as uuidv4} from "uuid";
import {Button,TextInput,Form,Stack,ToastNotification} from '@carbon/react';
import axios from'axios';
import cookies from "next-cookies";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
// import './style.scss';
import { postCar } from "../services/services";





function AddCar()
{
    

    
    const[car, setCar] =useState({
        id:"",
        regNo:"",
        email:"",
        userName:"",
        phoneNo:"",
        fromTime:"",
        toTime:"",
        slotNo:""

    });

    const router=useRouter();
    

function handleRegNo(e)
{
    setCar({...car,regNo:e.target.value});
}
function handleEmail(e)
{
    setCar({...car, email:e.target.value});
}
function handluserName(e)
{
    setCar({...car,userName:e.target.value});
}
function handlephoneNo(e)
{
    setCar({...car,phoneNo:e.target.value});
}
function handleFromTime(e)
{
    setCar({...car,fromTime:e.target.value});
}
function handleToime(e)
{
    setCar({...car,toTime:e.target.value});
}
function handleSlotNo(e)
{
    setCar({...car,slotNo:e.target.value});
}

function handleSubmit(e){
    e.preventDefault();
        if(car.userName.trim())
        {
            //here ...todo means that the rest of the properties of the todo object stay same, the ID 
            //we generate
            car.id=uuidv4();
            // addCars({...car,id:uuidv4() });
            // addCars(car);
            // const config= {
            //       headers:{
            //         Authorization: 'Bearer ' + getCookie('token')
            //       }
            //     };
            console.log("On insering new car ",car.id);
            // axios.post('http://localhost:3000/car', car,config)
            postCar(car)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
        console.log(err);
      })
            //after we add the todo 
            // we reset the todo object (task input)
            setCar({...car,email:"",userName:"",phoneNo:"",fromTime:"",toTime:"",regNo:"",slotNo:""});
            router.push('/listCar');
        }
        
       
    }

    return(
        <Stack gap={7}>
        <Form onSubmit={handleSubmit}>
            <div className="container">
            <TextInput value={car.regNo} onChange={handleRegNo} placeholder="Enter car registration Number" required /><br/>
            <TextInput type="email" value={car.email} onChange={handleEmail} placeholder="Enter emailID" required /><br/>
            <TextInput value={car.userName} onChange={handluserName} placeholder="Enter username" required /><br/>
            <TextInput value={car.phoneNo} onChange={handlephoneNo} placeholder="Enter phone Number" required/><br/>
            <TextInput value={car.fromTime} onChange={handleFromTime} placeholder="From" required/><br/>
            <TextInput value={car.toTime} onChange={handleToime} placeholder="To" required /><br/>
            <TextInput value={car.slotNo} onChange={handleSlotNo} placeholder="Slot No." required/>
            {/* <button type="submit">Submit</button> */}
            <Button type="submit">Submit</Button>
            <ToastNotification
        caption="00:00:00 AM"
        iconDescription="describes the close button"
        timeout={0}
        title="Notification title"
        status="Success"
        color="green"
        kind="success"
      />
            </div>
        </Form>
        </Stack>
            
        
    );

    
}

export default AddCar;
