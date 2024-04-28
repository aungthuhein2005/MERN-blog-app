import React from 'react'
import { IoCheckmarkCircle } from "react-icons/io5";

function Subscribed() {
    return (
        <div className='bg-green-500 text-white shadow-md w-3/12 text-center m-auto py-2 rounded-sm'>
            Subscribed <IoCheckmarkCircle className='inline' size={22}/>
        </div>
    )
}

export default Subscribed
