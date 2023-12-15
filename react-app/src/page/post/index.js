import React from 'react';
import TableHoc from '../../components/TableHoc';
import usePost from './hooks/usePost';
import { Input } from "antd";

const Post = (props = {}) => {

    const {
        columns,
        onChange,
        data,
        onSearch
    } = usePost({})
    const { Search } = Input;

    return (
        <>
            <h3 className="mb-3" style={{ fontSize: 30, fontWeight: 600, textAlign: 'center' }}>Danh sách bài đăng</h3>
            <Search
                className="mb-4"
                placeholder="Tìm kiếm theo tiêu đề"
                onSearch={onSearch}
                enterButton
            />
            <TableHoc
                className="table1"
                columns={columns}
                dataSource={data}
                onChange={onChange}
                rowKey={"_id"}
            />
        </>
    );
};
export default Post;