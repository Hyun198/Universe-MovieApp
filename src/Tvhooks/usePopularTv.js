import { useQuery } from "@tanstack/react-query";
import api from '../utils/api'

const fetchPopularTvs = () => {
    return api.get(`/tv/popular`)
}

export const usePopularTvQuery = () => {
    return useQuery({
        queryKey: ['tv-popular'],
        queryFn: fetchPopularTvs,
        select: (result) => result.data,
    })
}