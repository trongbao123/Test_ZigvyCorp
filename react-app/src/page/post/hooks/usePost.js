import { useCallback, useEffect, useMemo, useState } from "react";
import RenderComment from "../components/RenderComment";
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, searchPosts, } from "../../../store/actions/actions";
import { moment } from 'moment';
import dayjs from 'dayjs';

export default (options = {}) => {
    const { } = options || {};

    const dispatch = useDispatch();

    const posts = useSelector((state) => state.posts.posts);

    const [expanded, setExpanded] = useState(false);

    const onSearch = (value) => {
        dispatch(searchPosts(value));
    };
    
    useEffect(() => {
        dispatch(fetchPosts());
        return () => { }
    }, [dispatch]);

    const data = posts?.result?.docs || [];

    const toggleExpand = useCallback(() => {
        setExpanded(prevExpanded => !prevExpanded);
    }, [expanded]);

 

    return {
        data,
        onSearch,
        expanded,
        toggleExpand
    }

}