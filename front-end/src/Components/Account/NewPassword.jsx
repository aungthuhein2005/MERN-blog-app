import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCircleArrowRight } from "react-icons/fa6";
import VerifyStatus from './VerifyStatus';

function NewPassword() {

    const id = localStorage.getItem("user_id");

    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [error,setError] = useState("");
    const [success,setSuccess] = useState(false);

    const submitHandle = async () =>{
        if(password === confirmPassword){
            const response = await axios.patch(`http://localhost:5000/api/users/${id}`,{
                password: password,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            })
            console.log(response);
            setSuccess(true);
        }else{
            setError('password not same');
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className='bg-gray-100 w-2/4 p-3 rounded-md px-4'>
                { 
                    !success ? 
                    <div>
                        <div className='text-end text-sm pe-2 pb-2'>
                    <Link to="/account/edit/favourite" >Back <FaCircleArrowRight size={18} className='inline' /></Link>
                </div>
                <div className='pb-3'>
                    <label htmlFor="" className='pb-2 text-lg'>New Password</label><br />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} className='border-3 p-2 rounded-md outline-none border-gray-300 w-100' name="" id="name" placeholder='your new password' />
                </div>
                <div className='pb-3'>
                    <label htmlFor="" className='pb-2 text-lg'>Confirm Password</label><br />
                    <input onChange={(e) => {
                        setConfirmPassword(e.target.value)
                        if(error !== ''){
                            setError('');
                        }
                        }} type="password" value={confirmPassword} className='border-3 p-2 rounded-md outline-none border-gray-300 w-100' name="" id="email" placeholder='confirm password' />
                    {error !== "" ? <small className='text-sm text-red-500'>! {error}</small> : null}
                </div>
                <button onClick={submitHandle} className='bg-green-500 text-white rounded-md px-4 py-2 w-full text-md font-bold'>Submit</button>
                    </div> : 
                    <VerifyStatus success={true} text="Password change success" link='/account/' linkName="Go to profile" />
                }
            </div>
        </div>
    )
}

export default NewPassword
