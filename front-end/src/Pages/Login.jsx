import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = () => {
        axios.post('http://localhost:5000/api/users/login',{
            email : email,
            password: password,
        })
        .then((response)=>{
            console.log(response.data);
            
            let id = response.data.user._id;
            if(response.status === 200){
                localStorage.setItem('jwtToken', response.data.token)
                localStorage.setItem('user_id',id)
                navigate('/account');
            }
        })
    }

    return (
        <div className="flex items-center justify-center my-12">
            <div className='shadow p-4 border-1 border-gray-300 w-4/12'>
                <div className='py-2'>
                    <label htmlFor="" className='mb-3 text-lg font-bold text-gray-300'>Email</label><br />
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} className='border-1 border-gray-300 outline-none w-100 p-2' placeholder='email'/>
                </div>
                <div className='py-2'>
                    <label htmlFor="" className='mb-3 text-lg font-bold text-gray-300'>Password</label><br />
                    <input type="password" onChange={(e)=>setPassword(e.target.value)} className='border-1 border-gray-300 outline-none w-100 p-2' placeholder='password'/>
                </div>
                <div className='my-2'>
                    <button onClick={handleSubmit} className='bg-red-700 w-100 py-2 text-white text-lg  font-bold  tracking-wider shadow-sm'>Login</button>
                </div>
                <p>Don't have account? <Link to="/signup" className='text-blue-500 underline'>Sign up</Link></p>
            </div>
        </div>
    )
}

export default Login
