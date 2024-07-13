import React from 'react'
import { usePopularMoviesQuery } from '../../../../Moviehooks/usePopularMovies';
import { Alert } from 'bootstrap';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';


const PopularMovieSlide = () => {

    const { data, isError, error, isLoading } = usePopularMoviesQuery()

    if (isLoading) {
        return <h1>Loading...</h1>
    }
    if (isError) {
        return <Alert variants="danger">{error.message}</Alert>
    }

    if (!data || !data.results || data.results.length === 0) {
        return <h1>No movies found</h1>;
    }

    return (
        <div>
            <MovieSlider title='Popular Movies' movies={data?.results} responsive={responsive} />
        </div>

    )
}

export default PopularMovieSlide