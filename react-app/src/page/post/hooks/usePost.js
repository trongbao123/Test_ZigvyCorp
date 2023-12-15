import { useCallback, useEffect, useMemo, useState } from "react";
import RenderComment from "../components/renderComment";
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, searchPosts, } from "../../../store/actions/actions";
import { moment } from 'moment';
import dayjs from 'dayjs';

export default (options = {}) => {
    const { } = options || {};

    const dispatch = useDispatch();

    const posts = useSelector((state) => state.posts.posts);

    const [expanded, setExpanded] = useState(false);

    const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
    };

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

    const columns = [
        {
            title: "Tác giả",
            dataIndex: "user",
            width: "15%",
            sortDirections: ["descend", "ascend"],
            render: (value) => {
                return value?.[0]?.name || null
            }
        },
        {
            title: "Ngày tạo",
            dataIndex: "dateCreate",
            render: (params) => {
                return dayjs(params).format("DD/MM/YYYY") || null
            },
            width: "15%",
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            value: (text, object) => {
                return <span key={object}>{text}</span>;
            },
            width: "15%",
            sorter: (a, b) => a.acreage - b.acreage,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Nội dung",
            dataIndex: "body",
            render: (value) => {
                const maxLength = 100;
                let truncatedText = value.substring(0, maxLength);

                if (value.length > maxLength) {
                    truncatedText += "...";
                }
                return truncatedText
            },
            width: "20%",
            sorter: (a, b) => a.acreage - b.acreage,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Bình luận",
            dataIndex: "comments",
            render: (value) => {
                return RenderComment({
                    value,
                    expanded,
                    toggleExpand
                })
            },
            width: "20%",
            sorter: (a, b) => a.acreage - b.acreage,
            sortDirections: ["descend", "ascend"],
        },
    ]

    return {
        columns,
        onChange,
        data,
        onSearch
    }

}