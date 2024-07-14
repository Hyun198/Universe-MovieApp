import api from "../utils/api";
import { useQuery } from "@tanstack/react-query";

const fetchSearchTvs = ({ keyword, page }) => {


    return keyword ? api.get(`/search/tv?query=${keyword}&page=${page}`) : api.get(`/tv/popular?page=${page}`)

}

export const useSearchTvQuery = ({ keyword, page }) => {
    return useQuery({
        queryKey: ['search-tv', keyword, page],
        queryFn: () => fetchSearchTvs({ keyword, page }),
        select: (result) => result.data,
    })
}