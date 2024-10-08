import React from 'react'
import Banner from './components/Banner/Banner'
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide'
import UpcomingMovieSlide from './components/UpcomingMovieSlide/UpcomingMovieSlide'
import TopRatedMovieSlide from './components/TopRatedMovieSlide/TopRatedMovieSlide'
import PopularTvSlide from './components/PopularTvSlide/PopularTvSlide'

//1.배너
//2. popular movie
//3. top rated movie
//4. upcoming movie


const Homepage = () => {
    return (
        <div>
            <Banner />
            <PopularMovieSlide />
            <UpcomingMovieSlide />
            <TopRatedMovieSlide />
            <PopularTvSlide />
        </div>
    )
}

export default Homepage