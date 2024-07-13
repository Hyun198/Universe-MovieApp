import React from 'react'
import './TvCard.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faFire } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const TvCard = ({ tv }) => {

    const navigate = useNavigate();

    const handleMoveToDetail = (id) => {
        navigate(`/tvs/${id}`);
    }

    return (
        <div
            style={{
                backgroundImage:
                    "url(" +
                    `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${tv.poster_path}` +
                    ")",
            }}
            className="tv-card"
            onClick={() => handleMoveToDetail(tv.id)}
        >
            <div className="overlay">
                <h1 className="title">{tv.name}</h1>
                <div className="overlay-info">
                    <div><FontAwesomeIcon icon={faStar} /> {tv.vote_average.toFixed(1)}</div>
                    <div><FontAwesomeIcon icon={faFire} /> {Math.round(tv.popularity * 10) / 10}</div>
                    <div>{tv.adult ? "over18" : "under18"}</div>
                </div>
            </div>

        </div>
    )
}

export default TvCard