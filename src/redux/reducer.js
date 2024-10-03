let initialState = {
    likes: [] // 찜 목록
}

function reducer(state = initialState, action) {

    switch (action.type) {
        case 'ADD_LIKE':
            // 찜 목록에 새로운 영화 추가
            return {
                ...state,
                likes: [...state.likes, action.payload]
            };
        case 'REMOVE_LIKE':
            return {
                ...state,
                likes: state.likes.filter(movie => movie.id !== action.payload.id)
            };
        default:
            return state;
    }
}

export default reducer;