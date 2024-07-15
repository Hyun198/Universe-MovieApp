import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTvCredits = ({ tv_id }) => {
    return api.get(`/tv/${tv_id}/credits`)
}

export const useTvCreditsQuery = ({ tv_id }) => {
    return useQuery({
        queryKey: ['tv-credits', { tv_id }],
        queryFn: () => fetchTvCredits({ tv_id }),
        select: (result) => result.data,
    })

}