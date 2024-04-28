import React, { useEffect, useState} from 'react'
import RelatedItem from './RelatedItem'
import axios from 'axios';



function RelatedList(props) {
    const [data,setData] = useState("");
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/blogs/relatedBlogs/${props.category}`,{
        })
        .then((response)=>{
            setData(response.data)
        })
    },[]) 

    return (
        <div className='grid grid-cols-3 gap-10'>
            {data === "" ? <></> : data.map((item)=>{
                return <RelatedItem key={item._id} id={item._id} category={item.category} title={item.title} date={item.date} author={item.author.name} className="flex-2"/>
            })}
        </div>
    )
}

export default RelatedList
