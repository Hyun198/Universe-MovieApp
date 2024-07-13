import React from 'react'
import './SeasonCard.style.css'

const SeasonCard = ({ seasons }) => {

    const handleImageError = (e) => {
        e.target.src = 'https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'; // 대체 이미지의 URL을 여기에 넣으세요

    };

    return (
        <div className="season-card">
            {seasons?.map((season, index) => (
                <div key={index} className="season-item">
                    <img src={`https://media.themoviedb.org/t/p/w130_and_h195_bestv2${season.poster_path}`} alt={season.name} onError={handleImageError} />
                    <p>{season.name}</p>
                </div>
            ))}
        </div>
    )
}

export default SeasonCard