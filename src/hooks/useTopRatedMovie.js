import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchUseTopRatedMovies = () => {
    return api.get(`/movie/top_rated`);
}

export const useTopRatedMoviesQuery = () => {
    return useQuery({
        queryKey: ['movie-toprated'],
        queryFn: fetchUseTopRatedMovies,
        select: (result) => result.data,
    })
}