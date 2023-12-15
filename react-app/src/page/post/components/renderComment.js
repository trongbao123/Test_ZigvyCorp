import React from 'react'
import { Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const RenderComment = (props = {}) => {
    const {
        toggleExpand,
        expanded,
        value
    } = props || {};

    return (

        <div key={value?._id}>
            <div>
                <span>Số lượng bình luận: {value.length}</span>
                <Button onClick={toggleExpand}>
                    {expanded ? 'Thu gọn' : 'Xem bình luận'}
                </Button>

            </div>
            {expanded && (
                <div>
                    {value.map((comment, index) => {
                        const maxLength = 100;
                        let truncatedText = comment?.body.substring(0, maxLength);

                        if (comment?.body.length > maxLength) {
                            truncatedText += "...";
                        }
                        return <div key={index}>
                            <hr />
                            <p>Email:{comment.email}</p>
                            <p>Bình luận:{truncatedText}</p>
                        </div>
                    }
                    )}
                </div>
            )}
        </div>
    )
}

export default RenderComment;
