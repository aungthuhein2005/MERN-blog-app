import React from 'react'
import Logo from '../Assets/logo.png'
import { HiOutlineHome } from "react-icons/hi";
import { RiUserFollowLine } from "react-icons/ri";
import { Link } from 'react-router-dom'
import { IoHeartCircleSharp,IoSettings } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { BsFilePost } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import { useNavigate} from 'react-router-dom'

function Sidebar() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("user_id");
        navigate('/login');
    }   

    return (
        <div className='h-full bg-gray-100'>
            <div className='ps-8 pt-3'>
                <Link to="/"><img src={Logo} className='w-7/12' alt="" /></Link>
            </div>
            <ul className='px-4 pt-8'>
                <li className='border-b-2 py-3 hover:bg-gray-200 transition-bg duration-300 ps-2 rounded-md'><Link to="/account" className='flex'><HiOutlineHome size={24} /> <span className='px-1'>Profile</span></Link></li>
                <li className='border-b-2 py-3 hover:bg-gray-200 transition-bg duration-300 ps-2 rounded-md'><Link to="/account/posts" className='flex'><BsFilePost size={24} /> <span className='px-1'>Posts</span></Link></li>
                <li className='border-b-2 py-3 hover:bg-gray-200 transition-bg duration-300 ps-2 rounded-md'><Link to="/account/subscribe" className='flex'><RiUserFollowLine size={24} /> <span className='px-1'>SUBSCRIBE</span></Link></li>
                <li className='border-b-2 py-3 hover:bg-gray-200 transition-bg duration-300 ps-2 rounded-md'><Link to="/account/saved" className='flex'><FaBookmark size={24} /> <span className='px-1'>SAVED</span></Link></li>
                <li className='border-b-2 py-3 hover:bg-gray-200 transition-bg duration-300 ps-2 rounded-md'><div  className='flex cursor-pointer' onClick={logout}><IoLogOut size={24} /> <span className='px-1'>LOGOUT</span></div></li>
                {/* <li className='border-b-2 py-3 hover:bg-gray-200 transition-bg duration-300 ps-2 rounded-md'><Link to="/account/favourite" className='flex'><IoHeartCircleSharp size={24} /> <span className='px-1'>LIKED</span></Link></li> */}
            </ul>
        </div>
    )
}

export default Sidebar
