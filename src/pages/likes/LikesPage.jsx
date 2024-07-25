import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../../common/MovieCard/MovieCard';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 1, // optional, default to 1.
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

    const likes = useSelector(state => state.likes)
    console.log(likes);

    return (
        <Container>
            <Row>
                <Col>
                    <h1>찜 목록</h1>
                    {likes.length > 0 ? (
                        <Carousel
                            responsive={responsive}
                            infinite={true}
                            autoPlay={true}
                            autoPlaySpeed={3000}
                            keyBoardControl={true}

                            itemClass="carousel-item-padding-40-px"
                            containerClass="carousel-container"
                            className="movie-carousel"
                        >
                            {likes?.map(movie => (
                                <MovieCard movie={movie} key={movie.id} />
                            ))}
                        </Carousel>
                    ) : (
                        <p>찜 목록이 비어있습니다.</p>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default LikesPage