import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import { Alert } from 'bootstrap';
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';
import './PopularMovieSlide.style.css';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 8,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

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
            <h3>Popular Now</h3>
            <Carousel
                infinite={true}
                centerMode={true}
                itemClass="movie-slider p-1"
                containerClass="carousel-container"
                responsive={responsive}
            >
                {data?.results.map((movie, index) => <MovieCard movie={movie} key={index} />)}
            </Carousel>
        </div>

    )
}

export default PopularMovieSlide