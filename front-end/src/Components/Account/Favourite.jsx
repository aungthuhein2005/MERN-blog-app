import React, { useEffect, useState } from 'react'
import BlogImg from '../Assets/beach.jpg'
import { IoHeartCircleSharp } from "react-icons/io5";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from '../Modal';

function Favourite() {

    const id = localStorage.getItem("user_id");

    const [favourite,setFavourite] = useState("");
    const [postId,setPostId] = useState("");
    const [model,setModel] = useState(false);


    useEffect(()=>{
        fetchFavourite();
    },[])

    const fetchFavourite = async () => {
        const response = await axios.get(`http://localhost:5000/favourite/${id}`,{
            headers: {
                Authorization : `Bearer ${localStorage.getItem('jwtToken')}`,
            }
        }
        )
        setFavourite(response.data);
        return response;
    }

    const unLike = () =>{
        console.log("unlike");
        axios.patch(`http://localhost:5000/favourite/${id}`,{
            post_id: postId,
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            }
        })
        .then((response)=>{
            if(response.status === 200){
                fetchFavourite();
                setModel(false);
            }
        })
    }

    const cancelProcess = () =>{
        setModel(false);
    }

    return (
        <div className='pl-4'>
            <h3 className='font-bold text-xl fixed top-0 py-4 bg-white w-full'>Liked</h3>
            <div className='w-100 px-10 py-4'>
                <div className="grid grid-cols-4 gap-8">

                    {
                        favourite ? 
                        favourite.map(((item,i)=>{
                            return <div className='shadow-sm rounded-sm overflow-hidden' key={i}>
                                    <img src={BlogImg} alt="" className='w-full'/>
                                    <div className='flex p-2 items-center justify-between'>
                                        <Link to={`/blogs/${item._id}`} className='text-lg font-bold'>{item.title}</Link>
                                        <IoHeartCircleSharp size={23} className='cursor-pointer'
                                         onClick={()=>{
                                            setModel(true);
                                            setPostId(item._id);
                                        }} />
                                    </div>
                                </div>
                        })) : null
                    }

                    {model ? <Modal description="Are you sure you want to unlike" process={unLike} processName="Yes" cancel={cancelProcess} /> : null}

                    {/* <div className='shadow-sm rounded-sm overflow-hidden'>
                        <img src={BlogImg} alt="" className='w-full'/>
                        <div className='flex p-2 items-center justify-between'>
                            <h3 className='text-lg font-bold'>Title</h3>
                            <IoHeartCircleSharp size={23} className='cursor-pointer'/>
                        </div>
                    </div>

                    <div className='shadow-sm rounded-sm overflow-hidden'>
                        <img src={BlogImg} alt="" className='w-full'/>
                        <div className='flex p-2 items-center justify-between'>
                            <h3 className='text-lg font-bold'>Title</h3>
                            <IoHeartCircleSharp size={23} className='cursor-pointer'/>
                        </div>
                    </div>

                    <div className='shadow-sm rounded-sm overflow-hidden'>
                        <img src={BlogImg} alt="" className='w-full'/>
                        <div className='flex p-2 items-center justify-between'>
                            <h3 className='text-lg font-bold'>Title</h3>
                            <IoHeartCircleSharp size={23} className='cursor-pointer'/>
                        </div>
                    </div> */}

                    
                </div>
            </div>

        </div>
    )
}

export default Favourite
