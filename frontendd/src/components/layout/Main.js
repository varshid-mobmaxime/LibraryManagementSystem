/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { Affix, Drawer, Layout } from "antd";
import { useCallback, useEffect, useState } from "react";
import ChatBot from "react-chatbotify";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidenav from "./Sidenav";
import { useDispatch, useSelector } from "react-redux";
import { onButtonColorUpdate } from "../../redux/slice/themeSlice";

const { Header: AntHeader, Content, Sider } = Layout;

function Main() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sidenavColor, setSidenavColor] = useState();
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);

  const { buttonColor } = useSelector((state) => state.theme);

  useEffect(() => {
    setSidenavColor(buttonColor);
  }, [buttonColor]);

  console.log("sidenavColor is =--> ", sidenavColor);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = useCallback(
    (color) => {
      setSidenavColor(color);
      dispatch(onButtonColorUpdate(color));
    },
    [dispatch]
  );

  const handleFixedNavbar = (type) => setFixed(type);

  let { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "rtl") {
      setPlacement("left");
    } else {
      setPlacement("right");
    }
  }, [pathname]);

  const helpOptions = [
    "Quickstart",
    "API Docs",
    "Examples",
    "Github",
    "Discord",
  ];
  const flow = {
    start: {
      message:
        "Hello, I am Tan Jin 👋! Welcome to React ChatBotify, I'm excited that you are using our " +
        "chatbot 😊!",
      transition: { duration: 1000 },
      path: "show_options",
    },
    show_options: {
      message:
        "It looks like you have not set up a conversation flow yet. No worries! Here are a few helpful " +
        "things you can check out to get started:",
      options: helpOptions,
      path: "process_options",
    },
    prompt_again: {
      message: "Do you need any other help?",
      options: helpOptions,
      path: "process_options",
    },
    unknown_input: {
      message:
        "Sorry, I do not understand your message 😢! If you require further assistance, you may click on " +
        "the Github option and open an issue there or visit our discord.",
      options: helpOptions,
      path: "process_options",
    },
    process_options: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params) => {
        let link = "";
        switch (params.userInput) {
          case "Quickstart":
            link = "https://react-chatbotify.com/docs/introduction/quickstart/";
            break;
          case "API Docs":
            link = "https://react-chatbotify.com/docs/api/settings";
            break;
          case "Examples":
            link = "https://react-chatbotify.com/docs/examples/basic_form";
            break;
          case "Github":
            link = "https://github.com/tjtanjin/react-chatbotify/";
            break;
          case "Discord":
            link = "https://discord.gg/6R4DK4G5Zh";
            break;
          default:
            return "unknown_input";
        }
        await params.injectMessage("Sit tight! I'll send you right there!");
        setTimeout(() => {
          window.open(link);
        }, 1000);
        return "repeat";
      },
    },
    repeat: {
      transition: { duration: 3000 },
      path: "prompt_again",
    },
  };

  return (
    <Layout
      className={`layout-dashboard ${
        pathname === "profile" ? "layout-profile" : ""
      } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
    >
      <Drawer
        title={false}
        placement={placement === "right" ? "left" : "right"}
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        key={placement === "right" ? "left" : "right"}
        width={250}
        className={`drawer-sidebar ${
          pathname === "rtl" ? "drawer-sidebar-rtl" : ""
        } `}
      >
        <Layout
          className={`layout-dashboard ${
            pathname === "rtl" ? "layout-dashboard-rtl" : ""
          }`}
        >
          <Sider
            trigger={null}
            width={250}
            theme="light"
            className={`sider-primary ant-layout-sider-primary ${
              sidenavType === "#fff" ? "active-route" : ""
            }`}
            style={{ background: sidenavType }}
          >
            <Sidenav color={sidenavColor} />
          </Sider>
        </Layout>
      </Drawer>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={250}
        theme="light"
        className={`sider-primary ant-layout-sider-primary ${
          sidenavType === "#fff" ? "active-route" : ""
        }`}
        style={{ background: sidenavType }}
      >
        <Sidenav color={sidenavColor} />
      </Sider>

      <Layout className="px-2">
        {fixed ? (
          <Affix>
            <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
              <Header
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
              />
            </AntHeader>
          </Affix>
        ) : (
          <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
            <Header
              onPress={openDrawer}
              name={pathname}
              subName={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
            />
          </AntHeader>
        )}
        {/* <ChatBot
          settings={{
            general: { embedded: true },
            chatHistory: { storageKey: "example_faq_bot" },
          }}
          flow={flow}
        /> */}

        <Outlet />

        {/* <Footer /> */}
      </Layout>
    </Layout>
  );
}

export default Main;
