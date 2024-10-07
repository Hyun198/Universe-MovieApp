import { useInfiniteQuery } from "@tanstack/react-query";
import api from '../utils/api'


const fetchInfiniteMovies = ({ page, genre }) => {
    if (genre) {
        return api.get(`/discover/movie?with_genres=${genre}&page=${page}`);
    } else {
        return api.get(`/movie/top_rated?page=${page}`)
    }


}

export const useGetInfinityMovies = ({ genre }) => {
    return useInfiniteQuery({
        queryKey: ['infinite-movie', genre],
        queryFn: ({ pageParam }) => {
            return fetchInfiniteMovies({ page: pageParam, genre })
        },
        getNextPageParam: (last) => {

            if (last.data.page < last.data.total_pages) {
                return last.data.page + 1; // 다음 페이지 번호 반환
            }
            return undefined; // 더 이상 페이지가 없으면 undefined 반환
        },
        initialPageParam: 1,
    });
};