import React from 'react';
import beach from '../Assets/beach.jpg';
import { Link } from 'react-router-dom';

function RelatedItem(props) {
    return (
        <div className='flex shadow-md border-1 border-gray-300 p-2'>
            <img src={beach} className='w-20' alt="" />
            <div className='ps-3'>
                <Link to={`/blogs/${props.id}`}><p className=' font-bold'>Title</p></Link>
                <p className='text-xs'>Categroy : {props.category}</p>
                <p className='text-xs'>Author : {props.author}</p>
            </div>
        </div>
    )
}

export default RelatedItem
