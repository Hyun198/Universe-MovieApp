import React from 'react'
import { Col, Container, Row, Badge } from 'react-bootstrap'
import { Alert } from "bootstrap";
import { useParams } from 'react-router-dom'
import { useMovieDetailQuery } from '../../hooks/useMovieDetail'
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';

const MovieDetailPage = () => {
    const { id } = useParams();
    const { data, error, isLoading, isError } = useMovieDetailQuery({ movie_id: id })
    const movie = data;

    if (isError) {
        return <Alert varients="danger">{error.message}</Alert>;
    }
    if (isLoading) {
        return <h1>Loading...</h1>;
    }



    return (
        <Container>
            <Row>
                <Col lg={4} xs={12}>
                    <img src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`} />
                </Col>
                <Col lg={8} xs={12}>
                    <div className="genre">

                    </div>
                    <div>{movie.title}</div>

                    <div>{movie.popularity}</div>
                    <div>예산: {movie.budget}</div>
                    <div>줄거리: {movie.overview}</div>
                    <div>개봉일: {movie.release_date}</div>
                    <div>런타임: {movie.runtime}Min</div>
                </Col>
            </Row>


        </Container>
    )
}

export default MovieDetailPage