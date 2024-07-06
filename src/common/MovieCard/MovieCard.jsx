import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();

    const { data: genreData } = useMovieGenreQuery()

    const showGenre = (genreIdList) => {
        if (!genreData) {
            return [];
        }//장르데이터가 없다면 아무것도 안보여줌
        const genreNameList = genreIdList.map((id) => {
            const genreObj = genreData.find((genre) => genre.id === id)

            return genreObj.name;
        })

        return genreNameList
    }



    const handleMoveToDetail = (id) => {
        navigate(`/movies/${id}`);
    }


    return (
        <div
            style={{
                backgroundImage:
                    "url(" +
                    `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}` +
                    ")",
            }}
            className="movie-card"
            onClick={() => handleMoveToDetail(movie.id)}
        >
            <div className="overlay">
                <h1 className="title">{movie.title}</h1>
                <div className="genre">
                    {showGenre(movie.genre_ids).map((id) => (
                        <Badge className="movie-badge" bg="danger">{id}</Badge>
                    ))}
                </div>


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
