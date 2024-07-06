import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieCredits = ({ movie_id }) => {
    return api.get(`/movie/${movie_id}/credits`)

}

export const useMovieCreditsQuery = ({ movie_id }) => {
    return useQuery({
        queryKey: ['movie-credits', movie_id],
        queryFn: () => fetchMovieCredits({ movie_id }),
        select: (result) => result.data,
    })
}