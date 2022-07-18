import {Button,TextInput,Form,Stack,DataTable, TableRow,TableContainer,Table,TableHead,TableHeader,TableBody,TableCell,Link, CodeSnippetSkeleton
    ,TableToolbar,TableToolbarSearch,TableToolbarAction,TableToolbarContent,TableToolbarMenu} from '@carbon/react';
    import axios from'axios';
    import { useEffect,useState } from "react";
    import useStore from "../store/useGlobalStore";
import { getCookie,setCookie } from "cookies-next";
import cookies from 'next-cookies';
import { useRouter } from 'next/router';
import {dehydrate,QueryClient,useQuery,useMutation, useQueryClient} from 'react-query';
import { ToastNotification } from 'carbon-components-react';
import { getCars,deleteCar } from '../services/services';

const getCarData =async ()=> {
  // const{token}=cookies(context);
  const config= {
        headers:{
          Authorization: 'Bearer ' + getCookie('token')
        }
      };
      // const res=await axios.get('http://localhost:3000/car',config);
      return await axios.get('http://localhost:3000/car',config);
      
}

export async function getServerSideProps(context) {


  // const{token}=cookies(context);
  // const config= {
  //       headers:{
  //         Authorization: 'Bearer ' + token
  //       }
  //     };
  // const res= await axios.get('http://localhost:3000/car',config);
    


  // return {
  //   props: {
  //     cars:res.data
  //   }, // will be passed to the page component as props
  // }
  const queryClient=new QueryClient({
    defaultOptions:{
      queries:{

        refetchOnWindowFocus: true,
        refetchOnMount:true
      }
    }
  }
    
  );
  await queryClient.prefetchQuery('listCars',getCars);
  return{
    props:{
      dehydratedState:dehydrate(queryClient)
    }
  }
}

    function ListCar(){

      const [carsList,setCarsList]=useState([]);
      
      // const {data,isLoading,isFetching,status}=useQuery('listCars',getCarData.then(data=>setCarsList(data?.data)));
      const {data, isLoading , isFetching }= useQuery('listCars',async()=>{
         getCars()
        .then(
          data =>setCarsList(data?.data)
        )
        .catch(err=>console.log(err))
      },{staleTime: 30000});
      
      const queryClient=useQueryClient();
      const{mutate}=useMutation(deleteCar,{
        onSuccess:()=>{

          queryClient.invalidateQueries('listCars');
          console.log('inside onsucess mutate')
        },
      });
      
      // setCarsList(data?.data);

      const viewCarId=useStore((state)=>state.viewCarId);
      const setViewCarId=useStore((state)=>state.setViewCarId);
      const updateId=useStore((state)=>state.updateId);
      const setUpdateId=useStore((state)=>state.setUpdateId);
      const showToastNotif=useStore((state)=>state.showToastNotif);
        
const [deleteClick,setDeleteClick]=useState(false);
const router=useRouter();

  // useEffect(()=>{
  //   // axios.get('http://localhost:3000/car')
  //   // .then(response => {
  //   //   console.log("I am in useEffect of CarsList component",response.data);
  //   //   setCarsList(response.data);
  //   // })
  //   // .catch(err => {
  //   //   console.log(err);
  //   // })
  //   if(status==='success')
  //   {
  //     console.log('I am in Usefffect data',data?.data)
  //   setCarsList(data?.data);
  //   }
  //   console.log('I am in Usefffect data',data?.data)

  // },[deleteClick])

    // const navigate=useNavigate();
    function handleView(e){
       const id=e.target.value;
    //    console.log('View id ',id);
    //    //console.log(id.split(':'));
    //    const tempId=id.split(':');
    //    console.log(tempId);
    //    console.log(tempId[0]);
    //    const tempId1=tempId[0];
    //    console.log(tempId1);
        setViewCarId(id);
        setCookie('viewCarId',id);
        // navigate('/ViewCar');
    console.log('handleViewTriggered');
    router.push('/viewCar');

    }

        
   
    

    function handleClick(e)
    {
        const id=e.target.value
        
        // axios.delete(`http://localhost:3000/car/${id}`)
        // deleteCar(id)
        mutate(id)
  //   .then(response =>{ 
  //     console.log(response.data);
  //     setCarsList(response.data);
  //     setDeleteClick(true);
  // });
    }
    
    function handleEdit(e)
    {
        const id=e.target.value;
        console.log("axios Id in handlr edit button clicked ",id);
        setUpdateId(id);
        setCookie('updateId',id);
        // navigate('/UpdateCar');
        router.push('/updateCar');

    }

    function handleAddNew(e)
    {
      router.push('/addCar');
    }

    // console.log(cars.length);
   

      const headers = [

        {
            key: 'ticketId',
            header: 'Ticket ID',
          },
          {
            key: 'regNo',
            header: 'Car Registration No',
          },
          {
            key: 'userName',
            header: 'Name',
          }
        
        // {
        //   key: 'regNo',
        //   header: 'Reg No',
        // },
        // {
        //     key: 'email',
        //     header: 'Email',
        //   },
        // {
        //     key: 'userName',
        //     header: 'Username',
        //   },
        //   {
        //     key: 'phoneNo',
        //     header: 'Phone No',
        //   },
        //   {
        //     key: 'fromTime',
        //     header: 'From Time',
        //   },
        //   {
        //     key: 'toTime',
        //     header: 'To Time',
        //   }
      ];

      function onInputChange(e)
      {
        console.log("I am in search");
        const ticketId=e.target.value;
        return carsList.find(car=>{
          return car.ticketId===ticketId;
        })
      }

      return(
        <div className="container">
          {/* {showToastNotif &&  <ToastNotification
        iconDescription="describes the close button"
        timeout={0}
        title="Notification title"
        color="green"
        kind="success"
      />} */}
        <DataTable rows={carsList} headers={headers}>
  {({ rows, headers, getTableProps, getHeaderProps, getRowProps,onInputChange }) => (

<TableContainer title="Parking Lot Management System">
            <TableToolbar >
            {/* pass in `onInputChange` change here to make filtering work */}
            <TableToolbarSearch onChange={onInputChange} />
            <TableToolbarContent>
              <TableToolbarMenu>
                {/* <TableToolbarAction
                  icon={iconDownload}
                  iconDescription="Download"
                  onClick={action('TableToolbarAction - Download')}
                />
                <TableToolbarAction
                  icon={iconEdit}
                  iconDescription="Edit"
                  onClick={action('TableToolbarAction - Edit')}
                />
                <TableToolbarAction
                  icon={iconSettings}
                  iconDescription="Settings"
                  onClick={action('TableToolbarAction - Settings')}
                /> */}
              </TableToolbarMenu>
              <Button onClick={handleAddNew} small kind="primary">
                Add new
              </Button>
            </TableToolbarContent>
            </TableToolbar>

    <Table {...getTableProps()}>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableHeader {...getHeaderProps({ header })}>
              {header.header}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow {...getRowProps({ row })}>
            {row.cells.map((cell) => (
              <TableCell key={cell.id} value={row.id}>
                {/* <link onClick={handleView(cell.id)}  >
                {cell.value}
                </link> */}
               { cell.info.header==='ticketId' && <Button kind="ghost" onClick={handleView} value={row.id} isSelected={false}>
                {cell.value} 
                </Button>}
                {/* {cell.value} */}
                {cell.info.header!=='ticketId' && cell.value}
                
                </TableCell>
            ))}
             {/* <Button onClick={handleView} value={row.id} isSelected={false}>View</Button> */}
            <Button onClick={handleEdit} value={row.id}>Edit</Button> 
           <Button onClick={handleClick} value={row.id}>
            Delete
           {/* <FaTimes color='purple'/> */}
           </Button>
          </TableRow>
        ))}
        
      </TableBody>
    </Table>
 
  </TableContainer>
   )}
</DataTable>
</div>

      )

    }
    export default ListCar;
