import React from 'react'
import hero from '../Assets/hero.jpg'

function Hero() {
    return (
        <div className='relative'>
            <img src={hero} alt="" className='w-full h-80 object-cover' />
            <div className='absolute ' style={{top: "30%", left: "50%", transform: "translateX(-50%)"}}>
                <h1 className='text-5xl shadow-md'>"Today Reader, Tomorrow Leader"</h1>
                <span className='shadow-md text-2xl my-2'>"Knowledge Is Power"</span><br />
                <i className='shadow-md'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </i>
            </div>
        </div> 
    )
}

export default Hero
