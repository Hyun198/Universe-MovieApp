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
    console.log(genreData);
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

    // 장르 데이터를 처리하는 함수
    const getGenres = (genreList) => {
        if (!genreData) {
            return [];
        }

        if (Array.isArray(genreList)) {
            // genres가 직접 배열로 제공되는 경우
            return genreList.map((genre) => {
                const genreObj = genreData.find((g) => g.id === genre.id);
                return genreObj ? genreObj.name : 'Unknown';
            });
        } else if (Array.isArray(genreList.genre_ids)) {
            // genre_ids가 제공되는 경우
            return genreList.genre_ids.map((id) => {
                const genreObj = genreData.find((g) => g.id === id);
                return genreObj ? genreObj.name : 'Unknown';
            });
        }

        return [];
    };

    // 장르 리스트를 가져오는 로직
    const genreList = getGenres(movie.genres || movie.genre_ids || []);

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
                    {showGenre(movie?.genre_ids).map((id) => (
                        <Badge className="movie-badge" >{id}</Badge>
                    ))}
                </div>


                <div className="overlay-info">
                    <div><FontAwesomeIcon icon={faStar} /> {movie.vote_average.toFixed(1)}</div>
                    <div><FontAwesomeIcon icon={faFire} /> {Math.round(movie.popularity * 10) / 10}</div>
                    <div>{movie.adult ? "over18" : "under18"}</div>
                </div>
            </div>

        </div>
    );
};

export default MovieCard;
