import { FETCH_POSTS_SUCCESS, FETCH_POSTS, SEARCH_POSTS_SUCCESS, SEARCH_POSTS } from '../actionTypes/actionTypes.js';

export const fetchPostsSuccess = (posts) => ({
    type: FETCH_POSTS_SUCCESS,
    payload: posts,
});

export const searchPostsSuccess = (keyword) => ({
    type: SEARCH_POSTS_SUCCESS,
    payload: keyword,
});

export const fetchPosts = () => ({
    type: FETCH_POSTS,
});

export const searchPosts = (keyword) => {
    return {
        type: SEARCH_POSTS,
        payload: keyword,
    };
};