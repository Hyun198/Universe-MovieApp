import React from 'react'
import './SeasonCard.style.css'

const SeasonCard = ({ seasons }) => {

    return (
        <div className="season-card">
            {seasons?.filter(season => season.poster_path).map((season, index) => (
                <div key={index} className="season-item">
                    <img src={`https://media.themoviedb.org/t/p/w130_and_h195_bestv2${season.poster_path}`} alt={season.name} />
                    <p>{season.name}</p>
                </div>
            ))}
        </div>
    )
}

export default SeasonCard