import React from "react";
import TableHoc from "../../components/TableHoc";
import usePost from "./hooks/usePost";
import { Input } from "antd";
import RenderComment from "./components/RenderComment";
import dayjs from "dayjs";
import { Card } from "antd";
import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  UserOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { Avatar, List, Space } from "antd";

const Post = (props = {}) => {
  const { data, onSearch, expanded, toggleExpand } = usePost({});
  const { Search } = Input;

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  return (
    <div className="container">
      <h2
        className="mb-3 mt-5"
        style={{ fontSize: 30, fontWeight: 600, textAlign: "center" }}
      >
        LIST POST
      </h2>
      <Search
        style={{
          marginBottom: 20,
          width: "30%",
        }}
        className="mb-4"
        placeholder="Search title"
        onSearch={onSearch}
        enterButton
        size="large"
      />
      {data?.map((item, index) => {
        return (
          <Card
            key={index}
            title={item?.title}
            bordered={true}
            style={{
              width: "100%",
              marginBottom: 50,
            }}
          >
            <List itemLayout="vertical" size="large">
              <List.Item
                key={item.title}
                actions={[
                  <IconText
                    icon={StarOutlined}
                    text="156"
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={LikeOutlined}
                    text="156"
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text={
                      <div style={{ cursor: "pointer" }} onClick={toggleExpand}>
                        <span>{item?.comments.length} replies </span>
                        <span>
                          {expanded ? (
                            <CaretUpOutlined />
                          ) : (
                            <CaretDownOutlined />
                          )}
                        </span>
                      </div>
                    }
                    key="list-vertical-message"
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{ backgroundColor: "#87d068" }}
                      icon={<UserOutlined />}
                    />
                  }
                  title={<span>{item?.user?.[0]?.name}</span>}
                  description={item.description}
                />
                <p>Author: {item?.user?.[0]?.name}</p>
                <p>
                  Created at: {dayjs(item?.dateCreate).format("DD/MM/YYYY")}
                </p>
                <p>{item?.body}</p>
              </List.Item>
              <RenderComment
                expanded={expanded}
                toggleExpand={toggleExpand}
                value={item?.comments}
              />
            </List>
          </Card>
        );
      })}
    </div>
  );
};
export default Post;
