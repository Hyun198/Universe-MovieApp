import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTvVideo = ({ tv_id }) => {
    return api.get(`/tv/${tv_id}/videos`)
}

export const useTvVideoQuery = ({ tv_id }) => {
    return useQuery({
        queryKey: ['tv-video', { tv_id }],
        queryFn: () => fetchTvVideo({ tv_id }),
        select: (result) => result.data,
    })


    // Add other necessary queries here if needed. For example, for TV show details, TV show seasons, etc.
}