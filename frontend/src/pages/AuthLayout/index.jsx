import React, { useCallback, useEffect, useState } from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReadOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Card, Layout, List, Menu, theme } from "antd";
import { useDispatch } from "react-redux";
import {
  getAllBooksList,
  getBookDetails,
} from "../../redux/actions/BookAction";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Books from "../Books/Books.page";
import ChangePassword from "../Profile/ChangePassword.page";
import ViewProfile from "../Profile/ViewProfile.page";
import BookDetails from "../Books/BookDetails.page";
import Dashboard from "../Dashboard/Dashboard.page";
import NewDash from "../Dashboard/NewDash";
import { DashboardRoutes } from "../../route/NavigationRoutes";
const { Header, Content, Footer, Sider } = Layout;
const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "static",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));
const { Meta } = Card;

const AuthLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onReadMorePress = useCallback(
    (id) => {
      navigate("/book-details", {
        state: {
          id,
        },
      });
    },
    [navigate]
  );

  const [bookList, setBookList] = useState();

  console.log("BookList is =--> ", bookList);

  useEffect(() => {
    dispatch(
      getAllBooksList((isSuccess, result) => {
        setBookList(isSuccess ? result?.books : []);
      })
    );
  }, [dispatch]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  // const [hasResize, setHasResize] = useState();
  // const [windowWidth, setWindowWidth] = useState();
  // const [isSideOpen, setIsSideOpen] = useState();
  // useEffect(() => {
  //   window.addEventListener("resize", () => {
  //     setHasResize((prev) => !prev);
  //     setWindowWidth(window.innerWidth);
  //     console.log("windowWidth", windowWidth);
  //     if (window.innerWidth > 500) setIsSideOpen(true);
  //   });
  // }, [windowWidth]);

  return (
    <>
      <div className="page-section">
        <Layout hasSider className="page-section">
          {/* <Sider style={siderStyle} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={items}
            />
          </Sider> */}
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={siderStyle}
          >
            <div className="demo-logo-vertical" />
            <Menu
              onClick={(e) => {
                navigate(e?.key);
              }}
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "/Home",
                  icon: <UserOutlined />,
                  label: "nav 1",
                },
                {
                  key: "/change-password",
                  icon: <VideoCameraOutlined />,
                  label: "nav 2",
                },
                {
                  key: "/book-details",
                  icon: <UploadOutlined />,
                  label: "Book Details",
                },
              ]}
            />
          </Sider>
          <Layout>
            <div className="d-flex flex-column">
              <Header
                style={{
                  padding: 0,
                  background: colorBgContainer,
                }}
              >
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
              </Header>
              <Layout className="flex-grow-1 layout-band">
                <Content
                  style={{
                    padding: 15,
                  }}
                >
                  <DashboardRoutes />
                </Content>
              </Layout>
            </div>
          </Layout>
        </Layout>
      </div>
    </>
  );
};
export default AuthLayout;

//   {/* <main className="y-wrap"> */}
//   <Routes>
//   {/* <Route path="/" element={<Navigate to="/" />} /> */}
//   <Route path="/Home" element={<NewDash />} />
//   {/* <Route path="/books" element={<Books />} /> */}
//   {/* <Route
//     path="/change-password"
//     element={<ChangePassword />}
//     /> */}
//   <Route path="/view-profile" element={<ViewProfile />} />
//   <Route path="/book-details" element={<BookDetails />} />
// </Routes>
// <Outlet />
// {/* </main> */}

// {/* <Outlet /> */}
