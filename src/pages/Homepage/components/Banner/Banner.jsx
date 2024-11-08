import React from 'react'
import { usePopularMoviesQuery } from '../../../../Moviehooks/usePopularMovies'
import Alert from 'react-bootstrap/Alert';
import './Banner.style.css'

const Banner = () => {

    const { data, isLoading, isError, error } = usePopularMoviesQuery()
    if (isLoading) {
        <h2>Loading ...</h2>
    }
    if (isError) {
        <Alert variant="danger">{error.message}</Alert>
    }

    return (

        <div className="banner">
            <img src={`https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[0].poster_path}`} className="banner-image" />
            <div className="text-black banner-text-area">
                <h1>{data?.results[0].title}</h1>
                <p>{data?.results[0].overview}</p>
            </div>

        </div>

    )
}

export default Banner