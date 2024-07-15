import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";


const fetchTvRecommend = ({ tv_id }) => {
    return api.get(`tv/${tv_id}/recommendations`)
}

export const useTvRecommendQuery = ({ tv_id }) => {
    return useQuery({
        queryKey: ['tv-recommendations', tv_id],
        queryFn: () => fetchTvRecommend({ tv_id }),
        select: (result) => result.data,
    })

}