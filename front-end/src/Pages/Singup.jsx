import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios'
import bcrypt from 'bcryptjs'

function Singup() { 
    const navigate = useNavigate();
    let salt = bcrypt.genSaltSync(10);  

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [favourite,setFavoruite] = useState("");


    const formHandle = () => {
        if(password === confirmPassword){
            let hashPassword = bcrypt.hashSync(password,salt);
            axios.post('http://localhost:5000/users',{
                name: name,
                email: email,
                password: hashPassword,
                favourite: favourite,
            })
            .then(response => {
                console.log(response);
                if(response.data.acknowledged){
                    navigate('/login');
                }
            })
            .catch(err=>console.error(err))
        }
    }

    return (
        <div className="flex items-center justify-center my-12">
            <div className='shadow p-4 border-1 border-gray-300 w-4/12'>
            <div className='py-2'>
                    <label htmlFor=""  className='mb-3 text-lg font-bold text-gray-600'>Name</label><br />
                    <input type="text" onChange={(e)=>setName(e.target.value)} className='border-1 border-gray-300 outline-none w-100 p-2' placeholder='name'/>
                </div>
                <div className='py-2'>
                    <label htmlFor="" className='mb-3 text-lg font-bold text-gray-600'>Email</label><br />
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} className='border-1 border-gray-300 outline-none w-100 p-2' placeholder='email'/>
                </div>
                <div className='py-2'>
                    <label htmlFor="" className='mb-3 text-lg font-bold text-gray-600'>Password</label><br />
                    <input type="password" onChange={(e)=>setPassword(e.target.value)} className='border-1 border-gray-300 outline-none w-100 p-2' placeholder='password'/>
                </div>
                <div className='py-2'>
                    <label htmlFor="" className='mb-3 text-lg font-bold text-gray-600'>Confirm Password</label><br />
                    <input type="password" onChange={(e)=>setConfirmPassword(e.target.value)} className='border-1 border-gray-300 outline-none w-100 p-2' placeholder='confirm password'/>
                </div>
                <div>
                    <label htmlFor="" className='mb-3 text-lg font-bold text-gray-600'>Choose Your Favorite</label><br />
                    <select name="" id="" onChange={(e)=>setFavoruite(e.target.value)} className='border-1 border-gray-300 w-100 outline-none p-2'>
                        <option value="">Choose</option>
                        <option value="knowledge">Knowledge</option>
                        <option value="health">Health</option>
                        <option value="sport">Sport</option>
                        <option value="history">History</option>
                    </select>
                </div>
                <div className='my-2'>
                    <button onClick={formHandle} className='bg-green-700 w-100 py-2 text-white text-lg  font-bold  tracking-wider shadow-sm'>Create account</button>
                </div>
                <p>Already have a account <Link to="/login" className='text-blue-500 underline'>Login</Link></p>
            </div>
        </div>
    )
}

export default Singup
