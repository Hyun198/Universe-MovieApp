import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import MovieCard from '../../common/MovieCard/MovieCard';
import './LikesPage.style.css';


const LikesPage = () => {
    const dispatch = useDispatch();
    const likes = useSelector(state => state.likes) || [];
    console.log(likes);
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
                            <div className="like-remove" onClick={() => handleRemoveLikes(movie)}>취소</div>
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