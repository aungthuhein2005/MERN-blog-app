import React from 'react'
import logo from '../Assets/logo.png';
import {FaFacebook, FaInstagram, FaSquareTwitter, FaTwitter} from 'react-icons/fa6';
import {AiFillCopyrightCircle} from 'react-icons/ai';

function Footer() {
    return (
        <div className='py-8 lg:px-20  gap-10 bg-black text-white'>
            <div className='flex justify-between mb-4'>
                <div>
                    <h1 className='text-xl font-bold'>Company</h1>
                    <ul>
                        <li className='my-2'>
                            <a href="">About</a>
                        </li>
                        <li className='my-2'>
                            <a href="">Contact</a>
                        </li>
                        <li className='my-2'>
                            <a href="">Investors</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h1 className='text-xl font-bold'>Support</h1>
                    <ul>
                        <li className='my-2'>
                            <a href="">Customer Care</a>
                        </li>
                        <li className='my-2'>
                            <a href="">Security</a>
                        </li>
                        <li className='my-2'>
                            <a href="">See all service</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <img src={logo} width="25%" className='cursor-pointer my-2' alt="" />
                    <ul className='flex'>
                        <li className='cursor-pointer px-2'><FaFacebook size={25}/></li>
                        <li className='cursor-pointer px-2'><FaInstagram size={25}/></li>
                        <li className='cursor-pointer px-2'><FaTwitter size={25}/></li>
                    </ul>
                </div>
        </div><hr className='border-2 bg-white border-white w-3/12 m-auto my-2' />
        <div className='my-4'>
            <p className='flex items-center justify-center my-2'><AiFillCopyrightCircle/> All Right Reserved</p>
            <p className='flex justify-center'>Created by ATH</p>
        </div>
        </div>
    )
}

export default Footer
