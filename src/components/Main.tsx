import {useState} from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Main = () => {
  const navigate=useNavigate();
  const [first,setF]=useState<Boolean>(true);
  const [second,setS]=useState<Boolean>(false);
  const [third,setT]=useState<Boolean>(false);
  const [loading,setL]=useState<Boolean>(false);
  const [latitude,setLat]=useState<any>(null);
  const [longitude,setLon]=useState<any>(null)
  const [name,setN]=useState<string>("");
  const [email,setE]=useState<string>("");
  const [pincode,setP]=useState<string>("");
  const [add1,setA]=useState<string>("");
  const [add2,setAA]=useState<string>("");
  const [country,setC]=useState<string>("");
  const [state,setSs]=useState<string>("");
  const [file1,setF1]=useState<File|null>(null);
  const [file2,setF2]=useState<File|null>(null);
  const [file3,setF3]=useState<File|null>(null);
  const [gender,setG]=useState<string>("");
  const [status,setSa]=useState<string>("");
  const getlocaion=(event:React.MouseEvent<HTMLElement>)=>{
    event.preventDefault();
    setL(true);
    console.log("cheeck");
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
         console.log(position.coords.latitude,position.coords.longitude);
         setLon(position.coords.longitude);setLat(position.coords.latitude);
        alert("Geolocation Saved")
        },(err) => {
          alert(err);
        })
    }else{
      alert("not able to access the geo location");
    }
    setL(false);
  }
  const handleSubmit=async(event:React.MouseEvent<HTMLElement>)=>{
    event.preventDefault();
    setL(true);
    const formdata=new FormData();
    console.log(name,add1,add2,state,country,email,pincode);
   if(name==""||add1==""||state==""||country==""||email==""){
    setL(false);alert("All fields required in step 1");
    return;
   }
   else{
    let address:string=add1+add2;
    formdata.append("name",name);formdata.append("state",state);
    formdata.append("country",country);formdata.append("pincode",pincode);
    formdata.append("address",address);formdata.append("email",email);
   }console.log(file1);
    if(!file1){
      setL(false);
      alert("atleast first file which is required");
      return ;
    }
    else{formdata.append('files',file1);}
    if(file2){formdata.append('files',file2);}
    if(file3){formdata.append('file',file3);}
    if(gender!=""&&status!=""){
      formdata.append('gender',gender);
      formdata.append('status',status);
    }
    else{setL(false);alert('fill the required filed in step 3');return;}
    
    if(longitude!=""){formdata.append("longitude",longitude)}
    if(latitude!=""){formdata.append("latitude",latitude);}
    try{
      const data=await axios.post('https://levibackend.onrender.com/upload',formdata,{withCredentials:true});
      console.log(data.data);
      alert("Submitted Successfully");
      window.location.reload();
    }catch(err){
      console.log(err);
      alert("Need to login again");
      navigate("/");
    }
    setL(false);
  }
  return (
    <div className='mt-3 font-mono'>
        <Navbar/>
        <h1 className="text-center font-thin text-3xl">Levitation Assignment</h1>
        <div className="md:mx-10 text-xl mb-5">
            <div className='mx-10 sm:mx-0'>
            <h1>Fill the Form in just <span className="text-white">three(3)</span> steps...</h1>
            <h1>Fill All the required fields represented<span className='text-white'> by * sign...</span></h1>
            <div className="border-[2px] border-white mb-2"></div></div>
            <div>
              {first&&<div className='mx-5'>
                <h1 className='font-thin text-[30px]'>First Step.</h1>
                <div className='flex  justify-end items-center mt-3'>
                  <progress value={0.3}/><h1 className='ml-2'>30%/100%</h1>
                </div> 
                <div className='flex flex-col justify-center w-full p-5 border-[2px] border-white'>
                  <div className='my-2 md:my-5'>
                    <h1>Name*</h1>
                    <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setN(e.target.value)}}
                     className='pl-2 w-full h-10 rounded-xl'value={name} placeholder='Enter Name'/>
                  </div>
                  <div className='my-2 md:my-5'>
                    <h1>Email*</h1>
                    <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setE(e.target.value)}} 
                    className='pl-2 w-full h-10 rounded-xl'value={email} placeholder='Enter Email'/>
                  </div>
                  <div className='my-2 md:my-5'>
                    <h1>Address* (Line 1)</h1>
                    <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setA(e.target.value)}}
                    className='pl-2 w-full h-10 rounded-xl' value={add1} placeholder='Enter Address'/>
                  </div>
                  <div className='my-2 md:my-5'>
                    <h1>Address (Line 2)</h1>
                    <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setAA(e.target.value)}} 
                    className='pl-2 w-full h-10 rounded-xl' value={add2} placeholder='Enter Address'/>
                  </div>
                  <div className='my-2 md:my-5'>
                    <h1>Pincode</h1>
                    <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setP(e.target.value)}}
                     className='pl-2 w-full h-10 rounded-xl' value={pincode} placeholder='Enter Pin code'/>
                  </div>
                  <div className='my-2 md:my-5'>
                    <h1>Country*</h1>
                    <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setC(e.target.value)}} 
                    className='pl-2 w-full h-10 rounded-xl'value={country} placeholder='Enter country'/>
                  </div>
                  <div className='my-2 md:my-5  justify-center'>
                    <h1>Click the button if you want to store your geolocation</h1>
                    <button onClick={getlocaion} className='rounded bg-black text-white px-10 py-2 
                    hover:bg-white hover:text-black'>{loading?"loading...":"Get Geolocation"}</button>
                  </div>
                  <div className='my-2 md:my-5'>
                    <h1>City and State*</h1>
                    <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setSs(e.target.value)}} 
                    className='pl-2 w-full h-10 rounded-xl'value={state} placeholder='Enter city and state'/>
                  </div>
                  <div className='flex justify-center'>
                    <button onClick={(e:any)=>{e.preventDefault();setF(false);setS(true);setT(false);}} 
                      className='rounded bg-black text-white px-10 py-2 
                    hover:bg-white hover:text-black'>Next</button>
                  </div>
                  
                </div>
              </div>}
              {second&&<div className='mx-5'>
                <h1 className='font-thin text-[30px]'>Second Step.</h1>
                <div className='flex  justify-end items-center mt-3'>
                  <progress value={0.7}/><h1 className='ml-2'>70%/100%</h1>
                </div>
                <div className='flex flex-col justify-center w-full p-5 border-[2px] border-white'>
                    <h1 className='text-white'>Choose upto 3 files you want to showcase...</h1>
                    <h1>Resume *</h1>
                    <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                      const file = e.target.files?.[0] || null;
                      setF1(file)}} 
                    className='block my-5' type="file" />
                    <h1>Other</h1>
                    <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                      const file = e.target.files?.[0] || null;
                      setF2(file)}}
                     className='block my-5' type="file" />
                    <h1>Cover Letter</h1> 
                    <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                      const file = e.target.files?.[0] || null;
                      setF3(file)}} 
                    className='block my-5' type="file"/>
                    <div className='flex justify-between'>
                    <button onClick={(e:any)=>{e.preventDefault();setF(true);setS(false);setT(false);}} 
                      className='rounded bg-black text-white px-10 py-2 
                    hover:bg-white hover:text-black'>Previous</button>
                    <button onClick={(e:any)=>{e.preventDefault();setF(false);setS(false);setT(true);}} 
                      className='rounded bg-black text-white px-10 py-2 
                    hover:bg-white hover:text-black'>Next</button>
                  </div>
                </div>
              </div>}
              {third&&<div className='mx-5'>
                <h1 className='font-thin text-[30px]'>Third Step.</h1>
                <div className='flex  justify-end items-center mt-3'>
                  <progress value={0.9}/><h1 className='ml-2'>96%/100%</h1>
                </div>
                <div className='flex flex-col justify-center w-full p-5 border-[2px] border-white'>
                  <div>
                    <h1>Gender*</h1>
                    <select className='py-2 px-10' onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{
                      setG(e.target.value);
                    }} value={gender}>
                      <option value="">Select an Option</option>
                      <option value="Male" defaultChecked>Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <h1>Status*</h1>
                    <select className='py-2 px-10' onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{
                      setSa(e.target.value);
                    }} value={status}>
                    <option value="">Select an Option</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                    </select>
                  </div>
                  <div className='flex justify-between mt-2'>
                  <button onClick={(e:any)=>{e.preventDefault();setF(false);setS(true);setT(false);}} 
                      className='rounded bg-black text-white px-10 py-2 
                    hover:bg-white hover:text-black'>Previous</button>
                    <button onClick={handleSubmit} 
                      className='rounded bg-black text-white px-10 py-2 
                    hover:bg-white hover:text-black'>
                      {loading?"Loading....":"Submit"}
                    </button>
                  </div>
                </div>
              </div>}
            </div>  
        </div>
    </div>
  )
}

export default Main