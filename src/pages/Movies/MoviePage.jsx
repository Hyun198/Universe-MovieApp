import React, { useState, useEffect } from "react";
import { useSearchMovieQuery } from "../../Moviehooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Alert } from "bootstrap";
import { Col, Container, Row, Dropdown, Badge } from "react-bootstrap";
import MovieCard from '../../common/MovieCard/MovieCard';
import './MoviePage.style.css'
import { useMovieGenreQuery } from "../../Moviehooks/useMovieGenre";
import { useGetInfinityMovies } from "../../Moviehooks/useMovieInfinite";
import { useInView } from "react-intersection-observer";

const MoviePage = () => {
    const [query, setQuery] = useSearchParams();
    const [page, setPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const keyword = query.get("q");
    const { data: genres } = useMovieGenreQuery();
    const { data, isLoading, error, isError } = useSearchMovieQuery({ keyword, page, genre: selectedGenre });
    const { data: infiniteData, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetInfinityMovies({ genre: selectedGenre });
    console.log("iii", infiniteData)
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }


    }, [inView])

    const handleSortMovies = (movies, order) => {
        switch (order) {
            case 'popularity':
                return movies.sort((a, b) => b.popularity - a.popularity);
            case 'release_date':
                return movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
            case 'vote_average':
                return movies.sort((a, b) => b.vote_average - a.vote_average);
            default:
                return movies;
        }
    }

    const handleGenreSort = (genre) => {
        setSelectedGenre(genre.id);
        setPage(1);
    }

    const getSortOrderLabel = () => {
        switch (sortOrder) {
            case 'popularity':
                return '인기순';
            case 'release_date':
                return '최신순';
            // Add other cases if there are more sort options
            case 'vote_average':
                return '평점순';
            default:
                return 'Sort';
        }
    }


    if (isError) {
        return <Alert varients="danger">{error.message}</Alert>;
    }
    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    const movies = keyword ? data?.results : infiniteData?.pages.flatMap(page => page.data.results);


    const sortedMovies = handleSortMovies([...movies], sortOrder);

    return (
        <Container>
            <Row className="all-side">
                <Col className="left-side" lg={4} xs={12}>
                    Genres
                    <Row>
                        <Col xs={12} className="genre-list-container">
                            <div className="genre-list">
                                {genres?.map((genre) => (
                                    <Badge key={genre.id} onClick={() => handleGenreSort(genre)}
                                    >{genre.name}</Badge>
                                ))}
                            </div>
                        </Col>
                        <Col xs={12} className="sort-btn">
                            <Dropdown >
                                <Dropdown.Toggle id="dropdown-basic">
                                    {getSortOrderLabel()}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setSortOrder('popularity')}>인기순</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSortOrder('release_date')}>최신순</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSortOrder('vote_average')}>평점순</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </Col>
                <Col className="right-side" lg={8} xs={12}>
                    <Row>
                        {sortedMovies.map((movie, index) => (
                            <Col className="right-side-info" lg={3} xs={12} key={index}>
                                <MovieCard movie={movie} />
                            </Col>
                        ))}
                    </Row>

                    {!keyword && <h1 ref={ref}>Load more...</h1>}
                </Col>

            </Row>
        </Container>
    );
};

export default MoviePage;
