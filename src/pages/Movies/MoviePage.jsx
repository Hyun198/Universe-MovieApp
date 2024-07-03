import React, { useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Alert } from "bootstrap";
import { Col, Container, Row, Dropdown } from "react-bootstrap";
import MovieCard from '../../common/MovieCard/MovieCard';
import './MoviePage.style.css'
import ReactPaginate from 'react-paginate';

//경로 2가지
//nav바에서 클릭해서 온 경우 => popular 영화들 보여주기
//keyword를 입력해서 온 경우 => keword와 관련된 영화들을 보여줌

//페이지네이션 설치
//page state 만들기
//페이지네이션 클릭할때마다 page바꿔주기
//page값이 바뀔때마다 useSearchMovie에 page까지 넣어서 fetch

//필터기능
//장르 별로 검색, sort기능 구현

const MoviePage = () => {
    const [query, setQuery] = useSearchParams();
    const [page, setPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('');
    const keyword = query.get("q");

    const { data, isLoading, error, isError } = useSearchMovieQuery({ keyword, page });
    console.log("dddd", data);

    const handleSortMovies = (movies, order) => {
        switch (order) {
            case 'popularity':
                return movies.sort((a, b) => b.popularity - a.popularity);
            case 'release_date':
                return movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
            default:
                return movies;
        }
    }

    const handlePageClick = ({ selected }) => {
        setPage(selected + 1);

    }
    console.log("page", page);

    if (isError) {
        return <Alert varients="danger">{error.message}</Alert>;
    }
    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    const sortedMovies = handleSortMovies([...data?.results], sortOrder);
    console.log("sorted Movie:", sortedMovies);
    return (
        <Container>
            <Row className="all-side">
                <Col className="left-side" lg={4} xs={12}>
                    <Dropdown >
                        <Dropdown.Toggle id="dropdown-basic">
                            Sort
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1" onClick={() => setSortOrder('popularity')}>인기순</Dropdown.Item>
                            <Dropdown.Item href="#/action-2" onClick={() => setSortOrder('release_date')}>최신순</Dropdown.Item>

                        </Dropdown.Menu>


                    </Dropdown>
                </Col>
                <Col className="right-side" lg={8} xs={12}>
                    <Row>
                        {sortedMovies.map((movie, index) => (
                            <Col className="right-side-info" lg={3} xs={12} key={index}>
                                <MovieCard movie={movie} />
                            </Col>
                        ))}
                    </Row>
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={data?.total_pages} //전체 페이지
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                        forcePage={page - 1}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default MoviePage;
