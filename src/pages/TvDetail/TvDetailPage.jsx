import React, { useState } from 'react'
import TvCard from '../../common/TvCard/TvCard'
import { Container, Row, Col, Badge, Alert } from 'react-bootstrap'
import { useTvDetailQuery } from '../../Tvhooks/useTvDetail'
import { useParams } from 'react-router-dom'
import './TvDetailPage.style.css'
import SeasonCard from '../../common/SeasonCard/SeasonCard'
import Modal from 'react-modal';
import YouTube from 'react-youtube';
import { useTvVideoQuery } from '../../Tvhooks/useTvVideo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons';

const TvDetailPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { id } = useParams();
    const { data: tv, error, isLoading, isError } = useTvDetailQuery({ tv_id: id });
    const { data: videos } = useTvVideoQuery({ tv_id: id });

    if (isError) {
        return <Alert varients="danger">{error.message}</Alert>;
    }
    if (isLoading) {
        return <h1>Loading...</h1>;
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

    function openModal() {
        setModalIsOpen(true);
    }
    function closeModal() {
        setModalIsOpen(false);
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
                            <Badge className="trailer-button" onClick={openModal}>trailer</Badge>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={() => setModalIsOpen(false)}
                                style={customModalStyles}
                                ariaHideApp={false}
                                contentLabel="Pop up Message"
                                shouldCloseOnOverlayClick={false}
                            >
                                <button className='close-modal' onClick={closeModal}>X</button>
                                {videos && videos.results.length > 0 ? (
                                    <YouTube
                                        videoId={videos.results[0].key}
                                        opts={{
                                            width: "1015",
                                            height: "540",
                                            playerVars: {
                                                autoplay: 1, //자동재생 O
                                                rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                                                modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
                                            },
                                        }}
                                        //이벤트 리스너 
                                        onEnd={(e) => { e.target.stopVideo(0); }}
                                    />
                                ) : (
                                    <span className="no-trailer">trailer가 없습니다.❌</span>
                                )}

                            </Modal>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faFire} /> {tv.popularity}
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