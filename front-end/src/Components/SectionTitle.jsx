import React from 'react'

function SectionTitle(props) {
    return (
        <div className='my-12' >
            <h1 className='text-3xl text-center pb-2 uppercase'>{props.title}</h1>
            <div className='bg-yellow-300 border-yellow-300 border-3 w-20 mx-auto'/>
        </div> 
    )
}

export default SectionTitle
