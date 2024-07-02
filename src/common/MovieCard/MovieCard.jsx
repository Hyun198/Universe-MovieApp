import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
const MovieCard = ({ movie }) => {
    return (
        <div
            style={{
                backgroundImage:
                    "url(" +
                    `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}` +
                    ")",
            }}
            className="movie-card"
        >
            <div className="overlay">
                <h1 className="title">{movie.title}</h1>
                {movie.genre_ids.map((id) => (
                    <Badge bg="danger">{id}</Badge>
                ))}

                <div className="overlay-info">
                    <div>평점: {movie.vote_average.toFixed(1)}</div>
                    <div>인기: {Math.round(movie.popularity * 10) / 10}</div>
                    <div>{movie.adult ? "over18" : "under18"}</div>
                </div>
            </div>

        </div>
    );
};

export default MovieCard;
