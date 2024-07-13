import React from 'react'
import TvCard from '../../common/TvCard/TvCard'
import { Container, Row, Col, Badge, Alert } from 'react-bootstrap'
import { useTvDetailQuery } from '../../Tvhooks/useTvDetail'
import { useParams } from 'react-router-dom'
import './TvDetailPage.style.css'
import SeasonCard from '../../common/SeasonCard/SeasonCard'

const TvDetailPage = () => {
    const { id } = useParams();
    const { data: tv, error, isLoading, isError } = useTvDetailQuery({ tv_id: id });

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
                    <img src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${tv.poster_path}`} />
                </Col>
                <Col lg={8} xs={12}>

                    <div className="tv-info">
                        <div>{tv.name}
                            <Badge className="trailer-button">trailer</Badge>
                        </div>
                        <div>
                            {tv.popularity}
                        </div>
                        <div className="tv-overview">줄거리<br></br>
                            {tv.overview}
                        </div>
                        <div>
                            처음 방송일: {tv.first_air_date}
                            <br></br>
                            마지막 방송일: {tv.last_air_date}
                        </div>
                        <div>
                            태그라인: {tv.tagline ? tv.tagline : "No data😭"}
                        </div>
                        <div>
                            Create By: {tv.created_by && tv.created_by.length > 0 ? tv.created_by.map((creator, index) => (
                                <span key={creator.id}>{creator.name}{index < tv.created_by.length - 1 ? ', ' : ''}</span>)) : "No data😭"
                            }
                        </div>

                        <div className="tv-seasons">
                            <SeasonCard seasons={tv.seasons} />
                        </div>



                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="tv-reviews">

                    </div>
                </Col>
            </Row>

            <Row>

            </Row>

        </Container>
    )
}

export default TvDetailPage