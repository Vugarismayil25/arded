

import React from 'react'

import { Outlet } from 'react-router-dom';
import Navbar from '../../components/User/Navbar';
import GlobalCursor from '../../components/Admin/GlobalCursor';

function Layout() {
    return (
        <div>
            <Navbar />
            <GlobalCursor/>
            <Outlet />
        </div>
    )
}

export default Layout