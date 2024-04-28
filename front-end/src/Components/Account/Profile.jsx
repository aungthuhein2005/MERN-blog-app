import React,{useState, useEffect, useContext} from 'react'
import axios from 'axios';
import User from '../Assets/17.jpg'
import { CiEdit } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { useAccountContext } from '../../Context/AccountContext';

function Profile() {
    let [name,setName] = useState("");
    let [favourite,setFavourite] = useState("");
    const {data,loading} = useAccountContext();

    useEffect(() => {
        if (!loading) {
            setName(data.name)
            setFavourite(data.favourite)
        }
      }, [loading, data]);

    return (
        <div className='pl-4'>
            <h3 className='font-bold text-xl fixed top-0 py-4 bg-white w-full'>Profile</h3>
            <div className='w-100 px-10 py-4'>
                <div className='pt-8'>
                    <div className='flex items-baseline justify-between'>
                        <div>
                            <div style={{width: "80px"}} className=''>
                                <img src={User} alt="" className='rounded-full w-full '/>
                            </div>
                            <p className='text-gray-500 py-2 capitalize text-center'>{name}</p>
                        </div>
                        <Link to='/account/edit' className='bg-blue-500 text-white text-sm px-2 py-1 mb-2 rounded-md'>Edit Profile <CiEdit className='inline' size={22}/></Link>
                    </div>
                    <hr />
                    <div>
                        <p className='text-gray-700'>Favourite</p>
                        {
                            favourite !== '' ? 
                            favourite.map((item,i)=>{
                                return <button className='bg-gray-100 py-2 px-4 m-2 rounded-sm text-sm shadow-sm capitalize' key={i}>{item}</button>
                            }) : null
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile
