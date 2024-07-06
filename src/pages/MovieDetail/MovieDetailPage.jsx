import React from 'react'
import { Col, Container, Row, Badge } from 'react-bootstrap'
import { Alert } from "bootstrap";
import { useParams } from 'react-router-dom'
import { useMovieDetailQuery } from '../../hooks/useMovieDetail'
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import './MovieDetailPage.style.css';
import { useMovieCreditsQuery } from '../../hooks/useMovieCredits';
import { useMovieReviewQuery } from '../../hooks/useMovieReview';
import { useMovieRecomandsQuery } from '../../hooks/useMovieRecommand';

const MovieDetailPage = () => {
    const { id } = useParams();

    const { data: movie, error, isLoading, isError } = useMovieDetailQuery({ movie_id: id });

    const { data: genres } = useMovieGenreQuery();

    const { data: credits } = useMovieCreditsQuery({ movie_id: id });

    const { data: reviews } = useMovieReviewQuery({ movie_id: id });

    const { data: recommands } = useMovieRecomandsQuery({ movie_id: id });
    console.log(recommands);

    if (isError) {
        return <Alert varients="danger">{error.message}</Alert>;
    }
    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    const showGenre = (genreList) => {
        if (!genres) {
            return [];
        }
        const genreNameList = genreList.map((genre) => {
            const genreObj = genres.find((g) => g.id === genre.id);
            return genreObj ? genreObj.name : 'Unknown';
        });
        return genreNameList;
    };




    /* console.log("Genres: ", showGenre(movie.genres)); */




    return (
        <Container>
            <Row>
                <Col lg={4} xs={12}>
                    <img src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`} />
                </Col>
                <Col lg={8} xs={12}>
                    <div className='gerne-detail'>
                        {showGenre(movie.genres).map((id) => (
                            <Badge className="movie-badge" ># {id}</Badge>
                        ))}
                    </div>
                    <div className="movie-info">
                        <div>{movie.title}</div>
                        <div>{movie.popularity}</div>
                        <div>예산: ${movie.budget.toLocaleString()}</div>
                        <div>줄거리: {movie.overview}</div>
                        <div>개봉일: {movie.release_date}</div>
                        <div>런타임: {movie.runtime}Min</div>


                        <div className="movie-credits">
                            {credits?.cast.slice(0, 6).map((cast) => (
                                <div key={cast.cast_id}>
                                    {cast.name} as {cast.character}
                                </div>
                            ))}
                        </div>


                    </div>

                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="movie-reviews">
                        {reviews?.results.map((review) => (
                            <div key={review.id}>
                                {review.content}
                                <br></br>
                                author:{review.author}
                                <br></br>
                            </div>

                        ))}
                    </div>
                </Col>
            </Row>

            <Row>
                <Col>
                    <div className='movie-recommands'>

                    </div>
                </Col>
            </Row>

        </Container>
    )
}

export default MovieDetailPage