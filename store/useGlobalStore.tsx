import { CookieValueTypes } from 'cookies-next';
import create from 'zustand';
type Car={
    id:string,
    regNo:string,
    email:string,
    userName:string,
    phoneNo:string,
    fromTime:number,
    toTime:number,
    slotNo:string

}
type Store={
    carsList:Car[];
    viewCarId:string|CookieValueTypes;
    updateId:string|CookieValueTypes;
    loggedIn:boolean|CookieValueTypes;
    loggedInUser:string|CookieValueTypes;
    showToastNotif:boolean;
    setCarsList: (value:Car[])=>void;
    setViewCarId:(value:string|CookieValueTypes)=>void;
    setUpdateId:(value:string|CookieValueTypes)=>void;
    setLoggedIn:(value:boolean|CookieValueTypes)=>void;
    setLoggedInUser:(value:string|CookieValueTypes)=>void;
    setShowToastNotif:(value:boolean)=>void;


}
const useStore=create<Store>((set)=>({
    carsList:[],
    viewCarId:"",
    updateId:"",
    loggedIn:false,
    loggedInUser:"",
    showToastNotif:false,
    setCarsList:(value:Car[])=> set((state)=>({...state,carsList:value})),
    setViewCarId:(value:string|CookieValueTypes)=>set((state)=>({...state,viewCarId:value})),
    setUpdateId:(value:string|CookieValueTypes)=>set((state)=>({...state,updateId:value})),
    setLoggedIn:(value:boolean|CookieValueTypes)=>set((state)=>({...state,loggedIn:value})),
    setLoggedInUser:(value:string|CookieValueTypes)=>set((state)=>({...state,loggedInUser:value})),
    setShowToastNotif:(value:boolean)=>set((state)=>({...state,showToastNotif:value})),




}))
export default useStore;