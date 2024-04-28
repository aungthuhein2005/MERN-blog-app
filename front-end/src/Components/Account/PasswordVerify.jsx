 import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCircleArrowRight } from "react-icons/fa6";

function PasswordVerify() {

    const id = localStorage.getItem('user_id');

    const navigate = useNavigate();
    const [userData,setUserData] = useState("");
    const [emailVerify,setEmailVerify] = useState(true);
    const [receiver,setReceiver] = useState("");
    const [sending,setSending] = useState(false);

    useEffect(()=>{
        console.log(id);
        axios.get(`http://localhost:5000/api/users/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
        .then(response=>setUserData(response.data))
        .catch(err=>console.log(err));
    },[])

    const sendOTP = async () =>{
        const sendType = emailVerify ? "email" : "phone";
        console.log(`verify with ${sendType}`);
        setSending(true);
        const response = await axios.get(`http://localhost:5000/api/users/verify/send-email-otp`,
        {
            params: {
                sendType : sendType,
                receiver: receiver,
            }
        });
        if(response.status === 200){
            setSending(false);
            navigate('/account/edit/otp-verify');
        }
        setReceiver("");
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className='bg-gray-100 w-2/4 p-3 rounded-md px-4'>
                <div className='text-end text-sm pe-2 pb-2'>
                    <Link to="/account/edit/favourite" >Edit Favourite <FaCircleArrowRight size={18} className='inline'/></Link>
                </div>
            
                {
                    sending ?
                    <h1>Sending</h1> :

                    <div>
                        {
                        emailVerify ? 
                        <div className='pb-3'>
                            <label htmlFor="" className='pb-2 text-lg'>Email</label><br />
                            <input type="email" onChange={(e)=>setReceiver(e.target.value)} value={receiver} className='border-3 p-2 rounded-md outline-none border-gray-300 w-100' name="" id="password" placeholder='enter your email'/>
                        </div> :
                       <div className='pb-3'>
                            <label htmlFor="" className='pb-2 text-lg'>Phone</label><br />
                            <input type="text" onChange={(e)=>setReceiver(e.target.value)} value={receiver} className='border-3 p-2 rounded-md outline-none border-gray-300 w-100' name="" id="password" placeholder='enter your phone number'/>
                        </div>                     
                    }
                    </div>
                }

                <div className='text-end mb-1'>
                    <button className='text-sm text-blue-600 underline' 
                        onClick={()=>{
                            setEmailVerify(!emailVerify)
                            setReceiver("");
                        }}
                        >Verify with {emailVerify ? "phone" : "email"}</button>
                </div>
                <button className='bg-green-500 text-white rounded-md px-4 py-2 w-full text-md font-bold' onClick={()=>sendOTP()}>Send OTP</button>
            </div>
        </div>
    )
}

export default PasswordVerify
