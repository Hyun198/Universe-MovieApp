import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../Moviehooks/useMovieGenre";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faFire } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();
    const { data: genreData } = useMovieGenreQuery()
    const showGenre = (genreIdList, genres) => {
        if (!genreData) {
            return []; // genreData가 없으면 빈 배열 반환
        }

        // 장르 이름을 저장할 배열
        const genreNameList = [];

        // genreIdList가 있을 경우
        if (genreIdList && Array.isArray(genreIdList)) {
            genreIdList.forEach((id) => {
                const genreObj = genreData.find((genre) => genre.id === id);
                if (genreObj) {
                    genreNameList.push(genreObj.name); // 장르 이름 추가
                }
            });
        }

        // genres가 있을 경우
        if (genres && Array.isArray(genres)) {
            genres.forEach((genre) => {
                if (genre.name) {
                    genreNameList.push(genre.name); // 장르 이름 추가
                }
            });
        }

        return genreNameList; // 최종적으로 장르 이름 리스트 반환
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
                    {showGenre(movie?.genre_ids, movie?.genres).map((name) => (
                        <Badge key={name} className="movie-badge">{name}</Badge>
                    ))}
                </div>


                <div className="overlay-info">
                    <div><FontAwesomeIcon icon={faStar} /> {movie.vote_average.toFixed(1)}</div>
                    <div><FontAwesomeIcon icon={faFire} /> {Math.round(movie.popularity * 10) / 10}</div>

                </div>
            </div>

        </div>
    );
};

export default MovieCard;
