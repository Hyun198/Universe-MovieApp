import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTvReviews = ({ tv_id }) => {
    return api.get(`tv/${tv_id}/reviews`)
}

export const useTvReviewsQuery = ({ tv_id }) => {
    return useQuery({
        queryKey: ['tv-reviews', { tv_id }],
        queryFn: () => fetchTvReviews({ tv_id }),
        select: (result) => result.data,
    })
}