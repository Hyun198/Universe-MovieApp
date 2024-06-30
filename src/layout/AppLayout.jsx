import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
    return (
        <div className='app-layout'>
            <div className='navbar'>
                <img src="https://cdn.freelogovectors.net/wp-content/uploads/2020/01/universe-logo.png" alt="logo" />
                <ul>
                    <li>Home</li>
                    <li>Movies</li>
                </ul>
                <div className="search-box">
                    <input type="text" placeholder='search...' />
                    <button type="submit">Search</button>
                </div>
            </div>
            <Outlet />
        </div>

    )
}

export default AppLayout