import React from 'react'
import './CastCard.style.css'

const CastCard = ({ credits }) => {
    return (
        <div className="cast-card">
            {credits?.cast.slice(0, 6).map((cast) => (
                <div key={cast.cast_id}
                    style={{
                        backgroundImage:
                            "url(" +
                            `https://media.themoviedb.org/t/p/w138_and_h175_face${cast.profile_path}` +
                            ")",
                    }}
                    className="cast-profile"
                >
                    <div className="cast-info">
                        {cast.name} as <span>{cast.character}</span>
                    </div>
                </div>
            ))}
        </div>


    )
}

export default CastCard