import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaCircleArrowRight } from "react-icons/fa6";

function ProfileEdit() {

    const id = localStorage.getItem('user_id');

    const [userData,setUserData] = useState("");
    const [editName,setEditName] = useState("");
    const [editEmail,setEditEmail] = useState("");

    const fetchUserData = () => {
        axios.get(`http://localhost:5000/api/users/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
        .then(response=>{
            setEditName(response.data.name);
            setEditEmail(response.data.email);
        })
        .catch(err=>console.log(err));
    }

    useEffect(()=>{
        fetchUserData();
    },[])

    const submitHandle = () => {
        console.log("handle");
        axios.patch(`http://localhost:5000/api/users/${id}`,
            {
                name: editName,
                email: editEmail,
            },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
            },
        })
        .then(response=>{
            if(response.status === 200){
                fetchUserData();
            }
        })
        .catch(err=>console.log(err))
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className='bg-gray-100 w-2/4 p-3 rounded-md px-4'>
                <div className='text-end text-sm pe-2 pb-2'>
                    <Link to="/account/edit/favourite" >Edit Favourite <FaCircleArrowRight size={18} className='inline'/></Link>
                </div>
                <div className='pb-3'>
                    <label htmlFor="" className='pb-2 text-lg'>Name</label><br />
                    <input onChange={(e)=>setEditName(e.target.value)} type="text"  value={editName} className='border-3 p-2 rounded-md outline-none border-gray-300 w-100' name="" id="name" placeholder='your name'/>
                </div>
                <div className='pb-3'>
                    <label htmlFor="" className='pb-2 text-lg'>Email</label><br />
                    <input onChange={(e)=>setEditEmail(e.target.value)} type="email" value={editEmail} className='border-3 p-2 rounded-md outline-none border-gray-300 w-100' name="" id="email" placeholder='example@gmail.com'/>
                </div>
                <div className='pb-2 text-end'>
                    <Link to="/account/edit/password-verify" className='text-sm text-blue-700 underline cursor-pointer'>Forget password</Link>
                </div>
                <button onClick={submitHandle} className='bg-green-500 text-white rounded-md px-4 py-2 w-full text-md font-bold'>Change</button>
            </div>
        </div>
    )
}

export default ProfileEdit
