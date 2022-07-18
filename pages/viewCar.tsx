import { useEffect, useState } from "react";
import {Button,TextInput,Form,Stack,DataTable, TableRow,TableContainer,Table,TableHead,TableHeader,TableBody,TableCell,Tile} from '@carbon/react';
import axios from 'axios';
import useStore from "../store/useGlobalStore";
import cookies from "next-cookies";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import {dehydrate,QueryClient,useQuery} from 'react-query';
import { getCar } from "../services/services";


// const getCar =async ()=> {
//   // const{token}=cookies(context);
//   const config= {
//     headers:{
//       Authorization: 'Bearer ' + getCookie('token')
//     }
//   };
//   const viewCarId=getCookie('viewCarId');
//   // const res=await axios.get('http://localhost:3000/car',config);
//   return await axios.get(`http://localhost:3000/car/${viewCarId}`,config);
// }

export async function getServerSideProps(context) {


    // const{token,viewCarId}=cookies(context);
    // const config= {
    //       headers:{
    //         Authorization: 'Bearer ' + token
    //       }
    //     };
    // const res= await axios.get(`http://localhost:3000/car/${viewCarId}`,config)
                        
      
  
  
    // return {
    //   props: {
    //     car:res.data
    //   }, // will be passed to the page component as props
    // }
    const queryClient=new QueryClient();
    const {viewCarId}=cookies(context)
  await queryClient.prefetchQuery('viewCar',()=>getCar(viewCarId));
  return{
    props:{
      dehydratedState:dehydrate(queryClient)
    }
  }
  }
function ViewCar({car})

{

    const viewCarId=useStore((state)=>state.viewCarId);

    const [carView,setCarView]=useState([{
        id:"",
        email:"",
        regNo:"",
        userName:"",
        phoneNo:"",
        fromTime:"",
        toTime:"",
        slotNo:""

    }]);

    const {data, isLoading , isFetching }= useQuery('viewCar',async()=>{
      getCar(getCookie('viewCarId'))
     .then(
       data =>setCarView(data?.data)
     )
     .catch(err=>console.log(err))
   },{staleTime: 30000});

    // useEffect(()=>{
    //     // const car= cars.filter((car) => car.id === viewCarId);
    //     // console.log(car[0].id);
    //     // setCarView({id:car[0].id,email:car[0].email,regNo:car[0].regNo,userName:car[0].userName,
    //     //     phoneNo:car[0].phoneNo,fromTime:car[0].fromTime,toTime:car[0].toTime});

    // //         axios.get(`http://localhost:3000/car/${viewCarId}`)
    // // .then(response => {
    // //   setCarView(response.data);
    // // console.log(response.data);

    // // })
    // // .catch(err => {
    // //   console.log(err);
    // // })
    // setCarView(car);
    // },[])
    return(
        <Tile className="tile-container">
  <h5>Car Reg No :</h5>{carView.regNo}
  <h5>Slot No:</h5>{carView.slotNo}
  <h5>From Time:</h5>{carView.fromTime}
  <h5>To Time:</h5>{carView.toTime}
  <h5>Email:</h5>{carView.email}
  <h5>Username:</h5>{carView.userName}
  <h5>Phone No:</h5>{carView.phoneNo}
</Tile>

    );
// return(<h1>Hi</h1>);


}
export default ViewCar;