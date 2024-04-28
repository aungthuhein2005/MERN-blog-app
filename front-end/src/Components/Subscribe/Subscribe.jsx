import React, { useEffect, useState } from 'react'
import SectionTitle from '../SectionTitle'
import validator from 'validator'
import Subscribed from '../subscribed';
import axios from 'axios';

function Subscribe() {
    const [email,setEmail] = useState("");
    const [valid,setValid] = useState(true);
    const [success,setSuccess] = useState(false);

    // if(localStorage.getItem('subscribe')){
    //     setSuccess(true);
    // }

    // useEffect(()=>{
    //     axios.get('http://localhost:5000/subscribe_channel')
    //     .then((response)=>console.log(response))
    //     .catch(err=>console.error(err))
    // },[])

    const subscribeHandle = async () => {
        try {
            if (validator.isEmail(email)) {
                setValid(true);
                const response = await axios.post('http://localhost:5000/subscribe_channel', {
                    email: email
                });
                if (response.data.acknowledged) {
                    setSuccess(true);
                    localStorage.setItem('subscribe',true);
                }
                setEmail("");
            } else {
                setValid(false);
            }
        } catch (err) {
            console.error(err);
        }
    };
    

    return (
        <div className='bg-gray-100 py-4'>
            <SectionTitle title="Subscribe us to get new!" />
            {
                success || localStorage.getItem("subscribe") ? 
                <Subscribed/> : 
                <div>

            <div className='flex items-center justify-center pb-2'>
                <div className= {`${valid ? "" : "border-1 border-red-500"} relative shadow-md w-3/12 flex`}>
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full outline-none text-gray-400  p-2 py-3 rounded-l-md' placeholder='example@gmail.com' required/>
                    <button onClick={subscribeHandle} className='bg-yellow-400 px-2 text-white rounded-r-md'>Subscribe</button>
                    <p className={`${valid ? "hidden" : ""} absolute bottom-100 left-3/4 p-2 w-max bg-white shadow-lg border-1 border-gray-500`}>Email is not valid</p>
                </div>
            </div>
            <div className='text-center py-2 text-bold text-lg italic'>
                If you subscribe our blogs, you can knwo new blog when we post. <br/> We don't use your email for other ads purpose
            </div>
                </div>
            }
        </div>
    )
}

export default Subscribe
