import React from 'react'
import Author from './Assets/17.jpg'

function SubscribeList() {
    return (
        <div className='py-3 px-8'>
            <div className="grid grid-cols-3 gap-20 py-2">
            <div className='rounded-md shadow-md text-center py-2'>
                    <img src={Author} alt="" className='rounded-full m-auto' width="30%" />
                    <p className='
                    text-gray-400 font-bold'>Jhon</p>
                    <button className='bg-red-500 text-xs p-1 text-white rounded-sm'>Unsubscribe</button>
                </div> 
                <div className='rounded-md shadow-md text-center py-2'>
                    <img src={Author} alt="" className='rounded-full m-auto' width="30%" />
                    <p className='text-gray-400'>Jhon</p>
                    <button className='bg-red-500 text-xs p-1 text-white rounded-sm'>Unsubscribe</button>
                </div>
                <div className='rounded-md shadow-md text-center py-2'>
                    <img src={Author} alt="" className='rounded-full m-auto' width="30%" />
                    <p className='text-gray-400'>Jhon</p>
                    <button className='bg-red-500 text-xs p-1 text-white rounded-sm'>Unsubscribe</button>
                </div>
            </div>
        </div>
    )
}

export default SubscribeList
