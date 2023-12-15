import { FETCH_POSTS_FAILURE, FETCH_POSTS_SUCCESS, SEARCH_POSTS, SEARCH_POSTS_SUCCESS } from "../actionTypes/actionTypes";

const initialState = {
    keyword: "",
    posts: [],
    loading: false,
    error: null,
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_POSTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case SEARCH_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                loading: false,
                error: null,
            };
        case SEARCH_POSTS:
            return {
                ...state,
                keyword: action.payload,
            };
        default:
            return state;
    }
};

export default postsReducer;