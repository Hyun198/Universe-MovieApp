import api from "../utils/api";
import { useQuery } from "@tanstack/react-query";

const fetchTvDetail = ({ tv_id }) => {
    return api.get(`/tv/${tv_id}`)
}

export const useTvDetailQuery = ({ tv_id }) => {
    return useQuery({
        queryKey: ['tv-detail', tv_id],
        queryFn: () => fetchTvDetail({ tv_id }),
        select: (result) => result.data,
        staleTime: 3000000,
    })
}