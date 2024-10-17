import React, { useState } from 'react'
import './AppLayout.style.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
const AppLayout = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate()


    const handleSearch = (event) => {
        event.preventDefault();
        //url을 바꿔주기
        navigate(`/movies?q=${keyword}`);
        setKeyword("");
    }

    return (
        <div className='app-layout'>
            <div className='navbar'>
                <Link to="/"><img src="https://cdn.freelogovectors.net/wp-content/uploads/2020/01/universe-logo.png" alt="logo" /></Link>
                <ul>
                    <li><Link to="/movies">영화</Link></li>
                    <li><Link to="/tvs">시리즈</Link></li>
                    <li><Link to="/likes"><FontAwesomeIcon icon={faHeart} size="1.9x" color="white" /></Link></li>
                </ul>

                <div className="search-box">
                    <form onSubmit={handleSearch}>
                        <input type="text" placeholder='search...' value={keyword} onChange={(event) => setKeyword(event.target.value)} />
                        <button type="submit">Search</button>
                    </form>

                </div>
            </div>
            <Outlet />
        </div>

    )
}

export default AppLayout