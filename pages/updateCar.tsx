import {useEffect, useState} from "react";
import {Button,TextInput,Form,Stack} from '@carbon/react';
// import './style.scss';
import axios from 'axios';
import useStore from "../store/useGlobalStore";
import cookies from "next-cookies";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import {dehydrate,QueryClient,useQuery} from 'react-query';
import { getCar,putCar } from "../services/services";


// const getCar =async ()=> {
//   // const{token}=cookies(context);
//   const config= {
//         headers:{
//           Authorization: 'Bearer ' + getCookie('token')
//         }
//       };
//       const updateId=getCookie('updateId');
//       // const res=await axios.get('http://localhost:3000/car',config);
//       return await axios.get(`http://localhost:3000/car/${updateId}`,config);
      
// }

export async function getServerSideProps(context) {




    const{updateId}=cookies(context);
    // const config= {
    //       headers:{
    //         Authorization: 'Bearer ' + token
    //       }
    //     };
    // const res= await axios.get(`http://localhost:3000/car/${updateId}`,config)
                        
      
  
  
    // return {
    //   props: {
    //     car:res.data
    //   }, // will be passed to the page component as props
    // }
    const queryClient=new QueryClient();
  await queryClient.prefetchQuery('updateCar',()=>getCar(updateId));
  return{
    props:{
      dehydratedState:dehydrate(queryClient)
    }
  }
  }

function UpdateCar(){

    
    const updateId=useStore((state)=>state.updateId);
    const setShowToastNotif=useStore((state)=>state.setShowToastNotif);
 
    const[carNew, setCarNew] =useState({
        id:"",
        email:"",
        regNo:"",
        userName:"",
        phoneNo:"",
        fromTime:"",
        toTime:"",
        slotNo:""

    });
    const[carNewAxios, setCarNewAxios] =useState({
        id:"",
        email:"",
        regNo:"",
        userName:"",
        phoneNo:"",
        fromTime:"",
        toTime:"",
        slotNo:""

    });

    const router=useRouter();
      
    // const {data,isLoading,isFetching,status}=useQuery('listCars',getCarData.then(data=>setCarsList(data?.data)));
    const {data, isLoading , isFetching }= useQuery('updateCar',async()=>{
       getCar(getCookie('updateId'))
      .then(
        data =>setCarNewAxios(data?.data)
      )
      .catch(err=>console.log(err))
    },{staleTime: 30000});
    // useEffect(() => {
    //     //Runs only on the first render
    //     // console.log(cars.length);
    //     // const car= cars.filter((car) => car.id === updateId);
    //     // console.log(car);
    //     // setCarNew({id:car[0].id,email:car[0].email,regNo:car[0].regNo,userName:car[0].userName,
    //     // phoneNo:car[0].phoneNo,fromTime:car[0].fromTime,toTime:car[0].toTime});

    // //     axios.get(`http://localhost:3000/car/${updateId}`)
    // // .then(response => {
    // //   setCarNewAxios(response.data);
    // // console.log(response.data);

    // // })
    // // .catch(err => {
    // //   console.log(err);
    // // })
    // setCarNewAxios(car);

    //   }, []);

    // const car= cars.filter((car) => car.id === updateId);
    // const idx=cars.findIndex((car)=>car.id===updateId);
    // let temp_state = [...cars];
	
	// // 2. Make a shallow copy of the element you want to mutate
	// let temp_element = { ...temp_state[idx] };

//     const[car, setCar] =useState(cars.filter((car) => car.id === updateId));

   function handleRegNo(e){
    //    setCarNew({...carNew,regNo:e.target.value})
//     setCars({...car,regNo:e.target.value});
setCarNewAxios({...carNewAxios,regNo:e.target.value})
 }
 function handleEmail(e)
{
    // setCarNew({...carNew,email:e.target.value})
//     setCar({...car, email:e.target.value});
setCarNewAxios({...carNewAxios,email:e.target.value})

 }
function handluserName(e)
{
    // setCarNew({...carNew,userName:e.target.value})
//     setCar({...car,userName:e.target.value});
setCarNewAxios({...carNewAxios,userName:e.target.value})
 }
 function handlephoneNo(e)
{
    // setCarNew({...carNew,phoneNo:e.target.value})
//     setCar({...car,phoneNo:e.target.value});
setCarNewAxios({...carNewAxios,phoneNo:e.target.value})
 }
 function handleFromTime(e)
 {
    // setCarNew({...carNew,fromTime:e.target.value})
//     setCar({...car,fromTime:e.target.value});
setCarNewAxios({...carNewAxios,fromTime:e.target.value})
 }
 function handleToTime(e)
{
    // setCarNew({...carNew,toTime:e.target.value})
//     setCar({...car,toTime:e.target.value});
setCarNewAxios({...carNewAxios,toTime:e.target.value})
 }

 function handleSlotNo(e)
 {
    setCarNewAxios({...carNewAxios,slotNo:e.target.value})
 }
// const navigate=useNavigate();
function handleSubmit(e){
    e.preventDefault();
    // temp_state[idx] = temp_element;
    // setCarNew(temp_state);
        // if(car.userName.trim())
        // {
        //     //here ...todo means that the rest of the properties of the todo object stay same, the ID 
        //     //we generate
        //     // addCars({...car,id:uuidv4() });
        //     //after we add the todo 
        //     // we reset the todo object (task input)
        //     setCar({...car,email:"",userName:"",phoneNo:"",fromTime:"",toTime:"",regNo:""});
        // }

        // const updatedCars=cars;
        // updatedCars[idx]=carNew;
        // setCars(updatedCars);
        
    // const config= {
    //       headers:{
    //         Authorization: 'Bearer ' + getCookie('token')
    //       }
    //     };
        const id=getCookie('updateId')
        // axios.put(`http://localhost:3000/car/${id}`,carNewAxios,config)
        putCar(carNewAxios,id)
    .then(response => {
    //   setCarNewAxios(response.data);
    console.log(response.data);

    })
    .catch(err => {
      console.log(err);
    })
        // navigate('/');
        setShowToastNotif(true);
        router.push('/listCar');

}

    return(
        <Stack gap={7}>
        <Form className="container" onSubmit={handleSubmit}>
        <div className="form1">
            <TextInput value={carNewAxios.regNo}  onChange={handleRegNo} placeholder="Enter car registration Number" /><br/>
            <TextInput value={carNewAxios.email}  onChange={handleEmail} placeholder="Enter emailID" /><br/>
            <TextInput value={carNewAxios.phoneNo}  onChange={handlephoneNo} placeholder="Enter phone Number" /><br/>
            <TextInput value={carNewAxios.userName} onChange={handluserName} placeholder="Enter username" /><br/>
            <TextInput value={carNewAxios.fromTime} onChange={handleFromTime} placeholder="From" /><br/>
            <TextInput value={carNewAxios.toTime} onChange={handleToTime} placeholder="To" /><br/>
            <TextInput value={carNewAxios.slotNo} onChange={handleSlotNo} placeholder="Slot No." />
            <Button type="submit">Submit</Button>
            {/* <button type="submit" onClick={navigate('/')}>Cancel</button> */}
            </div>
        </Form>
        </Stack>
            
        
    );
    
}
export default UpdateCar;