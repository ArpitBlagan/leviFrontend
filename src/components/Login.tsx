import axios from 'axios';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate:any=useNavigate();
    const [isValid, setIsValid] = useState<boolean>(false);
    const [name,setN]=useState<string>("");
    const [email,setE]=useState<string>("");
    const [password,setP]=useState<string>("");
    const [ll,setLL]=useState<Boolean>(false);
    const [login,setL]=useState<Boolean>(true);
    const validateEmail = (email: string): boolean => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      };
    const handleClick=(event:React.MouseEvent<HTMLElement>)=>{
        event.preventDefault();
        setL(!login);
    }
    const handleLogin=async(event:React.MouseEvent<HTMLElement>)=>{
        event.preventDefault();
        if(email==""||password==""){alert("All fields required");return;}
        const body={email,password};setLL(true);
        try{
            const data=await axios.post('https://levibackend.onrender.com/v1/login',body,{withCredentials:true});
            console.log(data);navigate("/home")
        }catch(err){
            console.log(err);alert("something went wrong");
        }
        setLL(false);
    }
    const handleRegister=async(event:React.MouseEvent<HTMLElement>)=>{
        event.preventDefault();
        if(email==""||password==""||name==""){alert("All fields required");return;}
        const body={name,email,password};setLL(true);
        try{
            const data=await axios.post('https://levibackend.onrender.com/v1/register',body,{withCredentials:true});
            console.log(data);
            alert("Register Successfully");
            setL(true);
        }catch(err){
            console.log(err);
        }setLL(false);
    }
  return (
    <div className="h-[90dvh] flex justify-center">
        <div className=" flex flex-col justify-center items-center">
            <h1 className='text-[25px] underline text-white'>Levitation's Assignment</h1>
            <div className="bg-gray-600 p-10 font-thin text-[20px]">
                <div className="my-5">
                    <h1>Email*</h1>
                    <input type="email" className="pl-4 w-full h-10" value={email}
                     onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setE(e.target.value);
                     setIsValid(validateEmail(e.target.value));}} placeholder="Enter Email.."/>
                     {isValid ? <p>Email is valid</p> : <p>Email is invalid</p>}
                </div>
                {!login&&<div className="my-5">
                    <h1>Name*</h1>
                    <input value={name}
                     onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setN(e.target.value)}}
                        className="pl-4 w-full h-10" placeholder="Enter Name.."/>
                </div>}
                <div className="my-5">
                    <h1>Password*</h1>
                    <input value={password} type="password"
                     onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setP(e.target.value)}}
                    className="pl-4 w-full h-10" placeholder="Enter Password.."/>
                </div>
                <div className="mt-5 flex justify-center">
                    {login?<button onClick={handleLogin} className="px-10 py-3 bg-black text-white
                        hover:text-black hover:bg-white">{ll?"Loading..":"Login"}</button>:
                    <button onClick={handleRegister}  className="px-10 py-3 bg-black text-white
                        hover:text-black hover:bg-white">{ll?"Loading":"Register"}</button>
                    }
                </div>
                <div className='text-center text-white'>
                {!login?<button 
                    onClick={handleClick}
                >Already Registered</button>:<button onClick={handleClick}>Not Registered</button>}</div>
            </div>
        </div>
    </div>
  )
}

export default Login