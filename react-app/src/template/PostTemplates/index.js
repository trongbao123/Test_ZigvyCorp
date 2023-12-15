import { Fragment, useEffect } from "react";
import { NavLink, Outlet, Redirect, Route } from "react-router-dom";
import {
  PieChartOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";

const PostTemplates = (props) => {
  const { Header, Content, Footer, Sider } = Layout;
  const { Submenu } = Menu;
  const { Component, ...restProps } = props;
  const [collapsed, setCollapsed] = useState(false);

  return (

    <Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo mt-1 py-2">
            <NavLink to="/Home">
              <img
                style={{ width: "70%", marginLeft: "25px" }}
                src="../img/sky-logo-header.png"
                alt=""
              />
            </NavLink>
          </div>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="3" icon={<PieChartOutlined />}>
              <NavLink to="/">Dashboard</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="site-layout"
          style={{ backgroundColor: "#e8e8e8" }}
        >
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
                border: "1px solid #e2dcdc",
                backgroundColor: "aliceblue",
              }}
            >
              <Outlet />
              {/* <Component {...props} /> */}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            @ antd
          </Footer>
        </Layout>
      </Layout>
    </Fragment>
  );
};
export default PostTemplates;
