import React from 'react'
import ProfileEdit from './ProfileEdit'
import { Outlet, Route,Routes } from 'react-router-dom'
import FavoruiteEdit from './FavoruiteEdit'

function Edit() {
    return (
        <div>
            <Outlet/>
        </div>
    )
}

export default Edit
