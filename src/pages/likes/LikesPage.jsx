import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../../common/MovieCard/MovieCard';
import './LikesPage.style.css';
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2,
        slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    }
};

const LikesPage = () => {
    const dispatch = useDispatch();
    const likes = useSelector(state => state.likes)

    const handleRemoveLikes = (movie) => {
        dispatch({ type: 'REMOVE_LIKE', payload: movie });
    }

    return (
        <Container>
            <Row className="like-movies">
                {likes.length > 0 ? (
                    likes.map((movie) => (
                        <Col key={movie.id} lg={3} md={4} sm={6} xs={12} className="like-movie">
                            <MovieCard movie={movie} />
                            <div className="like-remove" bg="primary" onClick={() => handleRemoveLikes(movie)}>취소</div>
                        </Col>
                    ))
                ) : (
                    <p>찜 목록이 없습니다.</p>
                )}
            </Row>
        </Container>
    )
}

export default LikesPage