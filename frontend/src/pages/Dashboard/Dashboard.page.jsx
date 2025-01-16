// import React from "react";
// import {
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from "@ant-design/icons";

// import { Layout, Menu, theme } from "antd";
// const { Header, Content, Footer, Sider } = Layout;

// const items = [
//   { title: "Add Book", id: 1 },
//   { title: "Add Book Category", id: 2 },
//   { title: "Update Book", id: 3 },
//   { title: "All User List", id: 4 },
// ].map((item, index) => ({
//   key: String(index + 1),
//   // icon: React.createElement(icon),
//   label: item?.title,
// }));
// const Dashboard = () => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();
//   return (
//     <Layout>
//       <Sider
//         breakpoint="lg"
//         collapsedWidth="0"
//         onBreakpoint={(broken) => {
//           console.log(broken);
//         }}
//         onCollapse={(collapsed, type) => {
//           console.log(collapsed, type);
//         }}
//       >
//         <div className="demo-logo-vertical" />
//         <Menu
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={["1"]}
//           items={items}
//         />
//       </Sider>
//       <Layout>
//         <Header
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//           }}
//         />
//         <Content
//           style={{
//             margin: "24px 16px 0",
//           }}
//         >
//           <div
//             style={{
//               padding: 24,
//               minHeight: 360,
//               background: colorBgContainer,
//               borderRadius: borderRadiusLG,
//             }}
//           >
//             content
//           </div>
//         </Content>
//         <Footer
//           style={{
//             textAlign: "center",
//           }}
//         >
//           Ant Design ©{new Date().getFullYear()} Created by Ant UED
//         </Footer>
//       </Layout>
//     </Layout>
//   );
// };
// export default Dashboard;

import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Card, Layout, Menu, theme } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import AddBook from "../../assets/add.png";
import { getAllBooksList } from "../../redux/actions/BookAction";

import { IoIosBookmarks } from "react-icons/io";
import { PiShoppingCartFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { AppRoleEnum } from "../../constants/appConstant";
import RouteConstants from "../../constants/navigationRouteConstant";
import { DashboardRoutes } from "../../route/NavigationRoutes";

const { Header, Content, Footer, Sider } = Layout;
const siderStyle = {
  backgroundColor: "linear-gradient(135deg, #d3dcea, #33ccff)",
  overflow: "auto",
  // height: "100vh",
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

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.auth);

  const onReadMorePress = useCallback(
    (id) => {
      navigate(RouteConstants.BOOK_DETAIL_PAGE, {
        state: {
          id,
        },
      });
    },
    [navigate]
  );

  const [bookList, setBookList] = useState();

  console.log(
    "userData.role === AppRoleEnum.Admin is =--> ",
    userData.role === AppRoleEnum.Admin
  );

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
  const [hasResize, setHasResize] = useState();
  const [windowWidth, setWindowWidth] = useState();
  const [isSideOpen, setIsSideOpen] = useState();
  // useEffect(() => {
  //   window.addEventListener("resize", () => {
  //     setHasResize((prev) => !prev);
  //     setWindowWidth(window.innerWidth);
  //     console.log("windowWidth", windowWidth);
  //     if (window.innerWidth > 500) setIsSideOpen(true);
  //   });
  // }, [hasResize, windowWidth]);

  const userItem = [
    {
      key: RouteConstants.BOOK_PAGE,
      icon: <IoBookSharp />,
      label: "All Books",
    },
    {
      key: RouteConstants.FAVOURITE_BOOKS_PAGE,
      icon: <IoIosBookmarks />,
      label: "Favourite Books",
    },
    {
      key: RouteConstants.USER_REQUESTED_BOOKS,
      icon: <IoIosBookmarks />,
      label: "Issue Book",
    },
    // {
    //   key: "3",
    //   icon: <UploadOutlined />,
    //   label: "nav 3",
    // },
  ];
  const adminItem = [
    {
      key: RouteConstants.BOOK_PAGE,
      icon: <IoBookSharp />,
      label: "All Books",
    },
    {
      key: RouteConstants.ADD_BOOK_PAGE,
      icon: (
        <img
          src={AddBook}
          alt="Add Book"
          style={{
            height: 14,
            width: 14,
            filter: "invert(100%) brightness(100%) contrast(100%)",
          }}
        />
      ),
      label: "Add Books",
    },
    {
      key: RouteConstants.ALL_USER_PAGE,
      icon: <FaUsers />,
      label: "All User",
    },
    {
      key: RouteConstants.REQUEST_BOOK_PAGE,
      icon: <PiShoppingCartFill />,
      label: "Book Requests",
    },
    // {
    //   key: "",
    //   icon: <UploadOutlined />,
    //   label: "nav 3",
    // },
  ];

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
            // className="bg-danger"
          >
            <div className="demo-logo-vertical" />
            <Menu
              className="bg-transparent"
              onClick={(e) => {
                navigate(e?.key);
              }}
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[RouteConstants.BOOK_PAGE]}
              items={
                userData?.role === AppRoleEnum.Admin ? adminItem : userItem
              }
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

                  {/* <Routes>
                    <Route path="/books" element={<Books />} />
                    <Route
                      path="/change-password"
                      element={<ChangePassword />}
                    />
                    <Route path="/view-profile" element={<ViewProfile />} />
                    <Route path="/book-details" element={<BookDetails />} />
                  </Routes> */}
                  {/* <div className="row">
                      {bookList &&
                        bookList.map((data) => {
                          return (
                            <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-5 mb-lg-3">
                              <Card
                                hoverable
                                className="d-block border"
                                cover={
                                  <img
                                    alt="example"
                                    src={data.url}
                                    style={{
                                      minHeight: "300px",
                                      maxHeight: "300px",
                                    }}
                                  />
                                }
                                actions={[
                                  <ReadOutlined
                                    key="read more"
                                    onClick={() => {
                                      onReadMorePress(data?._id);
                                    }}
                                  />,
                                ]}
                              >
                                <div>{data.title}</div>
                              </Card>
                            </div>
                          );
                        })}
                    </div> */}
                </Content>
              </Layout>
            </div>
          </Layout>
        </Layout>
      </div>
    </>
  );
};
export default Dashboard;
