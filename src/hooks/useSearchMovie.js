import api from '../utils/api'
import { useQuery } from '@tanstack/react-query'

const fetchSearchMovies = ({ keyword, page }) => {
    return keyword ? api.get(`/search/movie?query=${keyword}&page=${page}`) : api.get(`/movie/popular?page=${page}`)
}

export const useSearchMovieQuery = ({ keyword, page }) => {
    return useQuery({
        queryKey: ['search-movie', keyword, page],
        queryFn: () => fetchSearchMovies({ keyword, page }),
        select: (result) => result.data,
    })
}