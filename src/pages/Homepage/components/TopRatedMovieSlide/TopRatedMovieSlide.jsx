import React from 'react'
import { useTopRatedMoviesQuery } from '../../../../Moviehooks/useTopRatedMovie'
import { Alert } from 'react-bootstrap';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';



const TopRatedMovieSlide = () => {

    const { data, error, isError, isLoading } = useTopRatedMoviesQuery()

    if (isError) {
        return <Alert variants="danger">{error.message}</Alert>
    }
    if (isLoading) {
        return <h1>Loading...</h1>
    }


    return (
        <div>
            <MovieSlider title={'Top Rated Movies'} movies={data?.results} responsive={responsive} />
        </div>
    )
}

export default TopRatedMovieSlide