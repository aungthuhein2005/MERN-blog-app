import React, { useEffect, useState } from 'react'
import Item from './Item/Item'
import Cookies from 'js-cookie';
import {getAllCookies} from '../Helper/help';

function ItemList(props) {
    const {data} = props;
    let cookie = getAllCookies(); //to get all cookie form document.cookie with obj format
    if(data !== ""){
        data.sort((a,b)=>{
            const clickCountA = cookie[a._id] || 0; //a._id is first obj id //if click count don't have set 0
            const clickCountB = cookie[b._id] || 0; //b._id is second obj id
            return clickCountB - clickCountA; //compare click count 
        })
    }

    return (
        
        <div >
            {data.length === 0 ? <p className='text-lg text-center'>There is no blog</p> : 
                <div className='grid grid-cols-3 gap-10'>
                    {data.map((item)=>{
                        return <Item key={item._id} image={item.image} description={item.description} id={item._id} title={item.title} date={item.date} className="flex-2"/>
                    })}
                </div>
                
            }
        </div>
    )
}

export default ItemList
