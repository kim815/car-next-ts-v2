import React, { useState } from "react";
import {Button,TextInput,Form,Stack,ToastNotification} from '@carbon/react';
import axios from "axios";
import useStore from "../store/useGlobalStore";
import { getCookie,setCookie } from "cookies-next";
import { useRouter } from "next/router";




function Login(){


    const setLoggedIn=useStore((state)=>state.setLoggedIn);
    const setLoggedInUser=useStore((state)=>state.setLoggedInUser);

const router=useRouter();
    const [user,setUser]=useState({
        email:"",
        password:""
    })


    

async function signin() {



    axios.post('http://localhost:3000/auth/signin',user)
        .then(res=>{
            // setCookie('token',res.hea)
             console.log(res);
             setCookie('token',res.data.accessToken);
             setCookie('email',user.email);
             setCookie('loggedIn',true);
             console.log(getCookie('token'));
            })
         .catch(err=>{console.log("Error is "+err)})
        }
    
    

    function handleEmailInputChange(e){
        setUser({...user, email: e.target.value});
    }

    function handlePasswordInputChange(e){
      setUser({...user, password: e.target.value});
    }

    async function handleSubmit(evt){
    
        evt.preventDefault()
        

        // axios.post('http://localhost:3000/auth', user)
        //  .then(res=>{
        //     localStorage.setItem('token', res.data.access_token)
        //      console.log(res)
        //      navigate('/')
        //     })
        //  .catch(err=>{console.log("Error is "+err)})
  
                await signin();
                setLoggedIn(true);
                setLoggedInUser(getCookie('email'));
            
                router.push('/listCar');
                }   


    return(
        <div className="App">
            

        <Form onSubmit={handleSubmit}>

                <TextInput
                style={{width: "500px", marginBottom: "10px"}}
                id="test2"
                invalidText="Invalid error message."
                labelText="Email"
                placeholder="Enter email"
                name="email"
                value={user.email}
                onChange={handleEmailInputChange}
                />

                <TextInput
                style={{width: "500px", marginBottom: "10px"}}
                id="test3"
                invalidText="Invalid error message."
                labelText="password"
                placeholder="Enter password"
                name="Password"
                value={user.password}
                type="password"
                onChange={handlePasswordInputChange}
                />
            
                
                <Button
                    style={{paddingLeft: "55px"}}
                    kind="primary"
                    tabIndex={0}
                    type="submit"
                >
                    Login
                </Button>
                {/* <ToastContainer /> */}
        </Form>

            
        </div>
    )


}
export default Login;