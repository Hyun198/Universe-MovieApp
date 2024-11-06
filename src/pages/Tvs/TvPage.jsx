import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Dropdown, Alert } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import { useSearchTvQuery } from "../../Tvhooks/useSearchTv";
import { useGetInfinityTvs } from '../../Tvhooks/useTvInfinite';
import TvCard from '../../common/TvCard/TvCard';
import { useInView } from "react-intersection-observer";


const TvPage = () => {

    const [query, setQuery] = useSearchParams();
    const [page, setPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('');

    const keyword = query.get("q");
    const { ref, inView } = useInView();
    const { data, isLoading, error, isError } = useSearchTvQuery({ keyword, page });
    const { data: infiniteData, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetInfinityTvs()

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView])

    const handleSortTvs = (tvs, order) => {
        switch (order) {
            case 'popularity':
                return tvs.sort((a, b) => b.popularity - a.popularity);
            case 'first_air_date':
                return tvs.sort((a, b) => new Date(b.first_air_date) - new Date(a.first_air_date));
            case 'vote_average':
                return tvs.sort((a, b) => b.vote_average - a.vote_average);
            default:
                return tvs;
        }
    }


    const getSortOrderLabel = () => {
        switch (sortOrder) {
            case 'popularity':
                return '인기순';
            case 'first_air_date':
                return '최신순';
            case 'vote_average':
                return '평점순';
            default:
                return 'Sort';
        }
    }

    const tvs = keyword ? data?.results : infiniteData?.pages?.flatMap(page => page.data.results) || [];

    console.log(tvs);

    const sortedTvs = handleSortTvs([...tvs], sortOrder);


    if (isError) {
        return <Alert varients="danger">{error.message}</Alert>;
    }
    if (isLoading) {
        return <h1>Loading...</h1>;
    }



    return (
        <Container>
            <Row className="all-side">
                <Col className="left-side" lg={4} xs={6}>
                    <Row>
                        <Col xs={12}>
                            <Dropdown >
                                <Dropdown.Toggle id="dropdown-basic">
                                    {getSortOrderLabel()}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setSortOrder('popularity')}>인기순</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSortOrder('first_air_date')} >최신순</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSortOrder('vote_average')} >평점순</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>

                </Col>

                <Col className="right-side" lg={8} xs={6}>
                    <Row>
                        {sortedTvs.map((tv, index) => (
                            <Col className="right-side-info" lg={3} xs={12} key={index}>
                                <TvCard tv={tv} />
                            </Col>
                        ))}
                    </Row>
                    {!keyword && <h1 ref={ref}>Load more...</h1>}
                </Col>
            </Row>




        </Container>
    )
}

export default TvPage