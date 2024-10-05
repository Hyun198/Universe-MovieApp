import api from '../utils/api'
import { useQuery } from '@tanstack/react-query'

const fetchSearchMovies = ({ keyword, page, genre }) => {

    if (genre) {
        return api.get(`/discover/movie?with_genres=${genre}`)
    }
    if (keyword) {
        return api.get(`/search/movie?query=${keyword}&page=${page}`)
    }

    return api.get(`/movie/popular?page=${page}`)
};

export const useSearchMovieQuery = ({ keyword, page, genre }) => {
    return useQuery({
        queryKey: ['search-movie', keyword, page, genre],
        queryFn: () => fetchSearchMovies({ keyword, page, genre }),
        select: (result) => result.data,
    })
}

