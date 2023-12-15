import { BASE_API_URL } from '../../config/config';

export const post = {
    getPosts: () => {
        return fetch(`${BASE_API_URL}/post-list`);
    },

    searchPost: (keyword) => {
        const url = `/post-list?keyword=${encodeURIComponent(keyword)}`;
        return fetch(`${BASE_API_URL}${url}`, {
            method: 'GET',
        });
    }
};