import React, { useEffect, useRef, useState } from 'react'
import logo from "../Assets/logo.png"
import {BiSolidUserCircle, BiSearch} from 'react-icons/bi'
import {MdArrowDropDown} from 'react-icons/md'
import { Link } from 'react-router-dom'
import CategoryNav from './CategoryNav'
import { MdOutlineLightMode,MdNightlight } from "react-icons/md";

function Navbar(props) {
    const linkRef = useRef(null);
    const [dropdown,setDropdown] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [nav,setNav] = useState("home");
    const dropdownHandle = (drop) => {
        if(drop){
            setDropdown(true)
        }else{
            setDropdown(false)
        }
    }

    useEffect(()=>{
        if(shouldRedirect){
            linkRef.current.click();
            setShouldRedirect(false);
        }
    },[shouldRedirect])

    return (
        <>
        <nav className='darkMode:bg-slate-900 flex items-center justify-between lg:px-14 shadow-sm'>
            <div>
                <Link to='/'><img src={logo} alt="" width="35%" className='cursor-pointer' /></Link>
            </div>
            <ul className='flex'>
                <li className='px-3 text-gray-500'>
                    <Link to="/" onClick={()=>setNav("home")} className={nav === "home" ? 'font-bold' : 'uppercase'}>HOME</Link>
                </li>
                <li className='px-3 text-gray-500'>
                    <Link to="/blogs" onClick={()=>setNav("blogs")} className={nav === "blogs" ? 'font-bold' : 'uppercase'}>BLOGS</Link>
                </li>
                <li className='px-3 text-gray-500 relative'> 
                    <p href="" className='uppercase cursor-pointer' onClick={()=>dropdownHandle(!dropdown)}>Category <MdArrowDropDown className='inline' size={25}/></p>
                    {
                        dropdown ? 
                        <CategoryNav dropdownHandle={dropdownHandle} />
                    : 
                    <></>
                    }
                </li>
            </ul>
            <div className='flex items-center'>
                <div className='relative mt-2 rounded-md shadow-sm mb-2'>
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span class="text-gray-500 sm:text-sm"><BiSearch size={25} className='shadwo-sm'/></span>
                    </div>
                    <input type="text" onKeyUp={(e)=>{
                        if(e.key === "Enter"){
                            setShouldRedirect(true);
                            props.handleSearch(e.target.value);
                        }
                    }} className='block w-full rounded-md border-0 outline-none py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6' />
                </div>
                <Link to='blogs/search' ref={linkRef}  ></Link>
                <Link to={localStorage.getItem("user_id") ? '/account' : '/login'} className='px-2'><BiSolidUserCircle size={35} className="cursor-pointer"/></Link>
                {/* <div className='card p-1 rounded-full cursor-pointer'><MdNightlight size={20}/></div> */}
            </div>
        </nav>
        <hr />
        </>
    )
}

export default Navbar
