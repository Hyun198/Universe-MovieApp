import { useInfiniteQuery } from "@tanstack/react-query";
import api from '../utils/api'


const fetchInfiniteTvs = ({ page }) => {
    return api.get(`/tv/top_rated?page=${page}`)
}

export const useGetInfinityTvs = () => {
    return useInfiniteQuery({
        queryKey: ['infinite-tv'],
        queryFn: ({ pageParam }) => {
            return fetchInfiniteTvs({ page: pageParam })
        },
        getNextPageParam: (last) => {
            if (last.data.page < last.data.total_pages) {
                return last.data.page + 1;
            }
            return undefined;
        },
        initialPageParam: 1,
    })
}