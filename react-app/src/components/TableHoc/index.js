import { Table } from "antd";
import React from "react";

function TableHoc(props = {}) {

    const {
        className,
        columns,
        dataSource,
        onChange,
        rowKey
    } = props || {};

    return <Table
        {...props}
        className={className}
        columns={columns}
        dataSource={dataSource}
        onChange={onChange}
        rowKey={rowKey}
    />
}

export default TableHoc;