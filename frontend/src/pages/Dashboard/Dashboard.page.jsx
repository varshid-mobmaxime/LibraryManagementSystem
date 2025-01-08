// import React from "react";
// import {
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from "@ant-design/icons";
// import Container from "react-bootstrap/Container";

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

import React, { useCallback, useEffect, useState } from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Card, Layout, List, Menu, theme } from "antd";
import { useDispatch } from "react-redux";
import {
  getAllBooksList,
  getBookDetails,
} from "../../redux/actions/BookAction";
import { Navigate, useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
const siderStyle = {
  overflow: "auto",
  height: "100vh",
  // position: "fixed",
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
  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout
        style={
          {
            // marginInlineStart: 20,
            // flex: 1,
            // backgroundColor: "red",
          }
        }
      >
        {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        /> */}
        <Content
          style={{
            padding: 15,
            // flex: 1,
            // flexGrow: 1,
            // backgroundColor: "red",
            // margin: "24px 16px 0",
            // overflow: "initial",
          }}
        >
          <List
            itemLayout="horizontal"
            style={{ flex: 1 }}
            // pagination
            grid={{
              gutter: 10,
              column: 3,
              xxl: 6,
              xl: 4,
              lg: 3,
              md: 2,
              sm: 1,
              xs: 1,
            }}
            dataSource={bookList}
            // dataSource={bookList}
            // style={{ backgroundColor: "pink" }}
            renderItem={(item) => (
              <List.Item
                style={{
                  flex: 1,
                  // backgroundColor: "orange",
                  // alignItems: "center",
                  // justifyContent: "center",
                }}
              >
                <div className="border rounded-lg shadow-md p-4 bg-white">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-80 object-cover rounded-md "
                  />
                  <h3 className="mt-4 font-bold">{item.title}</h3>
                  {/* <p className="text-sm text-gray-600">{item.desc}</p> */}
                  {/* <p className="mt-2">
                    <span className="font-semibold">Author:</span> {item.author}
                  </p> */}
                  {/* <p className="mt-1">
                    <span className="font-semibold">Language:</span>{" "}
                    {item.language}
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold">Copies Available:</span>{" "}
                    {item.copies}
                  </p> */}
                  <button
                    className="mt-4 w-full border  bg-zinc-50 text-zinc-800 py-2  hover:bg-zinc-600 hover:text-white transition"
                    onClick={() => {
                      onReadMorePress(item?._id);
                    }}
                  >
                    Read More
                  </button>
                </div>

                {/* ); }; */}
                {/* <Card
                  hoverable
                  style={{
                    width: 240,
                    flex: 1,
                    // height: 400,
                  }}
                  cover={<img alt="Book Image" src={item?.url} />}
                >
                  <Meta
                    // prefixCls="asdASdasd"
                    style={{ maxHeight: 100 }}
                    title={item?.title}
                    description={item?.desc}
                  />
                </Card> */}
                {/* <Card
                  style={{
                    flex: 1,
                    // backgroundColor: "orange",
                    // flexWrap: "wrap",
                  }}
                  title={item.title}
                >
                  Card content
                </Card> */}
              </List.Item>
            )}
          />
        </Content>
        {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};
export default Dashboard;
