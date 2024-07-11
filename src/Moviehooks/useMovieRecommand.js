import { useQuery } from "@tanstack/react-query";
import api from '../utils/api'

const fetchMovieRecomands = ({ movie_id }) => {
    return api.get(`/movie/${movie_id}/recommendations`)
}

export const useMovieRecomandsQuery = ({ movie_id }) => {
    return useQuery({
        queryKey: ['movie-recommendations', movie_id],
        queryFn: () => fetchMovieRecomands({ movie_id }),
        select: (result) => result.data,
        staleTime: 3000000,
    })
}