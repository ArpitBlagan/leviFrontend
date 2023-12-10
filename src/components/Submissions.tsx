import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
const Submissions = () => {
    const navigate:any=useNavigate();
    const [val,setV]=useState<Array<any>>([]);
    const get=async()=>{
        try{
        const data=await axios.get('https://levibackend.onrender.com/v1/all',{withCredentials:true})
            console.log(data);
            setV(data.data);
        }
        catch(err){
            alert("something went wrong you need to login again");
            navigate("/");
        }
    }
    useEffect(()=>{
        get();
    },[]);
  return (
    <div>
        <Navbar/>
        <h1 className="font-thin text-[40px] text-white text-center">Submissions</h1>
        <div>
            {val.map((ele,index)=>{
                return <div key={index} className='border-[2px] border-white p-2 grid w-full grid-cols-2 md:grid-cols-4'>
                    <h1><span className='text-white text-[20px]'>Name:</span> {ele.name}</h1>
                    <h1><span className='text-white text-[20px]'>Email:</span> {ele.email}</h1>
                    <h1><span className='text-white text-[20px]'>Addres:</span> {ele.address}</h1>
                    <h1><span className='text-white text-[20px]'>state :</span>{ele.state}</h1>
                    <h1><span className='text-white text-[20px]'>Latitude :</span>{ele.latitude}</h1>
                    <h1><span className='text-white text-[20px]'>longitude :</span>{ele.longitude}</h1>
                    <div className='col-span-2 md:col-span-3 flex flex-col justify-center'>
                        <h1 className='text-white text-[20px]'>Files:</h1>
                        <div className='flex justify-around'>
                        {ele.files.map((file:any,ind:number)=>{
                            return <h1 key={ind}>{ind+1} {file.name}</h1>
                        })}</div>
                    </div>
                </div>
            })}
            <div className='text-center'>OOps That's It..</div>
        </div>
    </div>
  )
}

export default Submissions