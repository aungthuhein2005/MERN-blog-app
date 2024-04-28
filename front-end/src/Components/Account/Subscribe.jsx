import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Author from '../Assets/17.jpg'

function Subscribe() {

    const id = localStorage.getItem('user_id');
    const [authorList, setAuthorList] = useState('');
    useEffect(()=>{
        fetchAuthors();
    },[])


    const fetchAuthors = async () => {
        const response = await axios.get(`http://localhost:5000/api/subscribes/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
        setAuthorList(response.data);
    }

    const unSubscribe = async (subscribedId) =>{
        axios.patch(`http://localhost:5000/api/subscribes/`,
        {
            subscribedId: subscribedId,
            userId: id,
        }
        ,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
        .then((response)=>{
            console.log(response);
            if(response.status === 200){
                fetchAuthors();
            }
        })
        .catch(err=>console.error(err));
    }

    return (
        <div className='pl-4'>
            <h3 className='font-bold text-xl fixed top-0 py-4 bg-white w-full'>Subscribe List</h3>
            <div className='w-50 px-10 py-4'>

            <ul className='pt-8'>

            {
                authorList.length > 0 ? 
                    authorList.map((item,i)=>{
                        return (
                            <li key={i} className='flex items-center justify-between bg-gray-100 p-4 rounded-md mb-2'>
                                <div className='flex items-center cursor-pointer'>
                                    <img src={Author} alt="" className='rounded-full w-1/4' />
                                    <p className='text-sm ps-2 font-bold text-gray-600'>{item.name}</p>
                                </div>
                                <button className='bg-red-500 p-1 text-xs text-white rounded-sm' onClick={()=>{unSubscribe(item._id)}}>Unsusbcribe</button>
                            </li>
                        )
                    }) : null
            } 
            </ul>

            </div>

        </div>
    )
}

export default Subscribe
