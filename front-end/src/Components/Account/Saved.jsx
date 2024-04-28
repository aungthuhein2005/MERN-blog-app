import React, { useState,useEffect } from 'react';
import Beach from '../Assets/beach.jpg'; // Unused import
import ItemList from '../ItemList';
import axios from 'axios'

function Saved() {
    const userId = localStorage.getItem("user_id");
    const [data, setData] = useState('');

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/users/saved/${userId}`)
        .then(response=>{
            console.log(response.data);
            setData(response.data);
        })
        .catch(error=>console.log(error))
    },[])

    return (
        <div className='pl-4'>
            <h3 className='font-bold text-xl fixed top-0 py-4 bg-white w-full'>Saved</h3>
            {/* {(data.length > 0)  ?  : <p>There is no blog</p>} */}
            <ItemList data={data} />
        </div>
    );
}

export default Saved;
