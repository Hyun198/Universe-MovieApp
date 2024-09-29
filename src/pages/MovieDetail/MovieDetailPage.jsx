import React, { useState } from 'react'
import { Col, Container, Row, Badge } from 'react-bootstrap'
import { Alert } from "bootstrap";
import { useParams } from 'react-router-dom'
import './MovieDetailPage.style.css';
import { useMovieDetailQuery } from '../../Moviehooks/useMovieDetail'
import { useMovieGenreQuery } from '../../Moviehooks/useMovieGenre';

import { useMovieCreditsQuery } from '../../Moviehooks/useMovieCredits';
import { useMovieReviewQuery } from '../../Moviehooks/useMovieReview';
import { useMovieRecomandsQuery } from '../../Moviehooks/useMovieRecommand';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill1, faFire } from '@fortawesome/free-solid-svg-icons';

import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'; // 채워진 하트 아이콘
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import CastCard from '../../common/CastCard/CastCard';
import MovieCard from '../../common/MovieCard/MovieCard';

import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';

import Modal from 'react-modal';
import YouTube from 'react-youtube';
import { useMovieVideoQuery } from '../../Moviehooks/useMovieVideo';

import { useDispatch, useSelector } from 'react-redux';

export const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
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

const MovieDetailPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const { id } = useParams();
    const [expandedReviewIds, setExpandedReviewIds] = useState({});
    const { data: movie, error, isLoading, isError } = useMovieDetailQuery({ movie_id: id });
    const { data: genres } = useMovieGenreQuery();
    const { data: credits } = useMovieCreditsQuery({ movie_id: id });
    const { data: reviews } = useMovieReviewQuery({ movie_id: id });
    const { data: recommands } = useMovieRecomandsQuery({ movie_id: id });
    const { data: videos } = useMovieVideoQuery({ movie_id: id });

    const dispatch = useDispatch();
    const likes = useSelector(state => state.likes); // 현재 찜 목록 가져오기
    const isLiked = movie && likes.some(like => like.id === movie.id);


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

    const showReview = (review) => {
        const isExpanded = expandedReviewIds[review.id];
        const toggleExpand = () => {
            setExpandedReviewIds((prev) => ({
                ...prev,
                [review.id]: !isExpanded,
            }));
        };
        return (
            <div className="movie-review" key={review.id}>
                <p>
                    {isExpanded ? review.content : `${review.content.slice(0, 100)}...`}
                    <button className="toggleShow" onClick={toggleExpand}>
                        {isExpanded ? '접기' : '더보기'}
                    </button>
                    <p className="author"><strong>Author:</strong> {review.author}</p>
                </p>
            </div>
        );
    }

    const customModalStyles = {
        overlay: {
            backgroundColor: " rgba(0, 0, 0, 0.4)",
            width: "100%",
            height: "100vh",
            zIndex: "10",
            position: "fixed",
            top: "0",
            left: "0",
        },
        content: {
            width: "1025px",
            height: "600px",
            zIndex: "150",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "10px",
            boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
            backgroundColor: "black",
            justifyContent: "center",
            overflow: "hidden",
        },
    };

    const AddMovieLikes = () => {

        dispatch({ type: "ADD_LIKE", payload: movie })
    }

    const RemoveMovieLikes = () => {
        dispatch({ type: 'REMOVE_LIKE', payload: movie })
    }

    function openModal() {
        setModalIsOpen(true);
    }
    function closeModal() {
        setModalIsOpen(false);
    }

    const videoKey = videos?.results?.[0]?.key;


    return (
        <Container>
            <Row>
                <Col lg={4} xs={12}>
                    <img src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`} />
                </Col>
                <Col lg={8} xs={12}>
                    <div className='genre-detail'>
                        {showGenre(movie.genres).map((id, index) => (
                            <Badge key={index} className="movie-badge" ># {id}</Badge>
                        ))}
                    </div>
                    <div className="movie-info">
                        <div>{movie.title}
                            <Badge className="trailer-button" onClick={openModal}>trailer</Badge>

                            {isLiked ? (
                                <FontAwesomeIcon
                                    icon={faHeartSolid}
                                    size="lg"
                                    style={{ marginLeft: '10px', cursor: 'pointer' }}
                                    onClick={RemoveMovieLikes}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faHeartRegular}
                                    size="lg"
                                    style={{ marginLeft: '10px', cursor: 'pointer' }}
                                    onClick={AddMovieLikes}
                                />
                            )}


                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={() => setModalIsOpen(false)}
                                style={customModalStyles}
                                ariaHideApp={false}
                                contentLabel="Pop up Message"
                                shouldCloseOnOverlayClick={false}
                            >
                                <button className='close-modal' onClick={closeModal}>X</button>
                                <div>
                                    {videoKey && (
                                        <YouTube
                                            videoId={videos?.results[0].key}
                                            opts={{
                                                width: "1015",
                                                height: "540",
                                                playerVars: {
                                                    autoplay: 1, //자동재생 O
                                                    rel: 0, //관련 동영상 표시하지 않음 
                                                    modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
                                                },
                                            }}
                                            //이벤트 리스너 
                                            onEnd={(e) => { e.target.stopVideo(0); }}
                                        />
                                    )}



                                </div>

                            </Modal>


                        </div>
                        <div><FontAwesomeIcon icon={faFire} /> {movie.popularity}</div>
                        <div><FontAwesomeIcon icon={faMoneyBill1} /> ${movie.budget.toLocaleString()}</div>
                        <div className="movie-overview">줄거리<br></br>
                            {movie.overview}
                        </div>
                        <div className="movie-release" >개봉 : {movie.release_date}</div>
                        <div>Run Time : {movie.runtime} Min</div>
                        <div className="movie-credits">
                            <CastCard credits={credits} />
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="movie-reviews">
                        {reviews?.results.map((review) => showReview(review))}
                    </div>
                </Col>
            </Row>

            <Row>
                {recommands?.results && recommands.results.length > 0 && (
                    <Carousel className="relate-carousel"
                        infinite={true}
                        centerMode={true}
                        itemClass="movie-slider p-1"
                        containerClass="carousel-container"
                        responsive={responsive}
                    >
                        {recommands.results.slice(0, 6).map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </Carousel>
                )}
            </Row>

        </Container>
    )
}

export default MovieDetailPage