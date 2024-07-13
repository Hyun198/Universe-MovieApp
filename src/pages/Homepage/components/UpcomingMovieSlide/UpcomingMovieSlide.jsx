import React from 'react'
import { useUpcomingMoviesQuery } from '../../../../Moviehooks/useUpcomingMovies';
import { Alert } from 'bootstrap';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';


const UpcomingMovieSlide = () => {

    const { data, isError, error, isLoading } = useUpcomingMoviesQuery()

    if (isError) {
        return <Alert variants="danger">{error.message}</Alert>
    }
    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <MovieSlider title={'Up Coming Movies'} movies={data?.results} responsive={responsive} />
        </div>
    )
}

export default UpcomingMovieSlide