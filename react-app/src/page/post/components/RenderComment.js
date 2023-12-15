import React from "react";
import VirtualList from "rc-virtual-list";
import { Avatar, List, message } from "antd";
import { CaretDownOutlined, CaretUpOutlined ,UserOutlined,MessageOutlined} from "@ant-design/icons";
import useComment from "./hooks/useComment";

const RenderComment = (props = {}) => {

  const { toggleExpand, expanded, value } = props || {};

  const { onScroll, ContainerHeight } = useComment({});

  return (
    <div key={value?._id}>
      {expanded && (
        <List>
          <VirtualList
            data={value}
            height={ContainerHeight}
            itemHeight={47}
            itemKey="email"
            onScroll={onScroll}
          >
            {(item) => (
              <List.Item key={item.name}>
                <List.Item.Meta
                  avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />}
                  title={<span>{item.email}</span>}
                  description={item.body}
                />
              </List.Item>
            )}
          </VirtualList>
        </List>
      )}
    </div>
  );
};

export default RenderComment;
