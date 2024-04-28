import React from 'react'
import { Outlet } from 'react-router-dom';

function Blog() {

    return (
        <div className='lg:px-20 pb-12'>
            <Outlet/>
        </div>
    )
}

export default Blog;
