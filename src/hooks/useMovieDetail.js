import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'

const fetchMovieDetail = ({ movie_id }) => {
    return api.get(`/movie/${movie_id}`)
}

export const useMovieDetailQuery = ({ movie_id }) => {
    return useQuery({
        queryKey: ['movie-detail', movie_id],
        queryFn: () => fetchMovieDetail({ movie_id }),
        select: (result) => result.data
    })

}