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
import React, { Component, useCallback, useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Checkbox,
  Upload,
  message,
} from "antd";
import logo1 from "../assets/images/logos-facebook.svg";
import logo2 from "../assets/images/logo-apple.svg";
import logo3 from "../assets/images/Google__G__Logo.svg.png";
import "./viewProfile.css";

import { Link } from "react-router-dom";
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const SignUp = () => {
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // const handleChange = useCallback((info) => {
  //   console.log("Info is =--> ", info);

  //   if (info.file.status === "uploading") {
  //     return;
  //   }
  //   if (info.file.status === "done") {
  //     const payload = {
  //       avatar: info?.file?.response?.url,
  //     };

  //     setImageUrl(info?.file?.response?.url);

  //     // info?.file?.response?.success &&
  //     //   dispatch(
  //     //     UpdateProfilePic(payload, (isSuccess) => {
  //     //       setLoading(false);
  //     //       setImageUrl(info?.file?.response?.url);
  //     //     })
  //     //   );

  //     // Get this url from response in real world.

  //     // getBase64(info.file.originFileObj, (url) => {
  //     //   setImageUrl(url);
  //     // });
  //   }
  // }, []);

  const handleChange = (info) => {
    console.log("info is =--> ", info);

    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <Header>
          <div className="header-col header-brand">
            {/* <h5>Library Management</h5> */}
          </div>
        </Header>

        <Content className="p-0">
          <div className="sign-up-header">
            <div className="content">
              <Title>Sign Up</Title>
              <p className="text-lg">Please register with this form.</p>
            </div>
          </div>

          <Card
            className="card-signup header-solid h-full ant-card pt-0"
            title={<h5>Register With</h5>}
            bordered="false"
          >
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="row-col"
            >
              {/* Profile Picture Upload */}
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                }}
              >
                <ImgCrop
                  rotationSlider
                  cropperProps={{
                    aspect: 1, // Aspect ratio (1:1 for a square or circle)
                    zoomWithScroll: true, // Allow zooming with scroll
                    showGrid: true, // Show grid lines in the cropper
                    cropSize: { width: 200, height: 200 }, // Crop area size in pixels
                    minZoom: 1, // Minimum zoom level
                    maxZoom: 3, // Maximum zoom level
                    zoomSpeed: 0.5, // Zoom speed
                    style: {
                      containerStyle: { backgroundColor: "#f8f8f8" }, // Style for the container
                      cropAreaStyle: { border: "2px dashed #666" }, // Style for the cropping area
                    },
                  }}
                  cropShape="round"
                >
                  <Upload
                    name="avatar"
                    listType="picture-circle"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="http://localhost:5001/media-upload/profile"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                          width: "100%",
                        }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                  {/* <Upload
                    name="file"
                    // listType="picture-circle"
                    // className="avatar-uploader"
                    showUploadList={false}
                    action="http://localhost:5001/media-upload/profile"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    className="flex"
                  >
                    <div>
                      {imageUrl ? (
                        <div>
                          <img
                            src={imageUrl}
                            alt="Profile Pic"
                            className="profile-pic rounded-circle"
                          />
                          <div className="hover-edit">
                            <p>Edit</p>
                          </div>
                        </div>
                      ) : (
                        uploadButton
                      )}
                    </div>
                  </Upload> */}
                </ImgCrop>
              </div>
              {/* <Form.Item
                  name="profilePic"
                  valuePropName="fileList"
                  getValueFromEvent={(e) =>
                    Array.isArray(e) ? e.slice(-1) : e?.fileList.slice(-1)
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please upload your profile picture!",
                    },
                  ]}
                >
                  <Upload
                    listType="picture-card"
                    beforeUpload={() => false} // Prevent automatic upload
                    maxCount={1} // Restrict to a single file
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item> */}
              <Form.Item
                name="First Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your First Name!",
                  },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                name="Last Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Last Name!",
                  },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
              <Form.Item
                name="userName"
                rules={[
                  {
                    required: true,
                    message: "Please input your UserName!",
                  },
                ]}
              >
                <Input placeholder="UserName" />
              </Form.Item>
              <Form.Item
                name="Phone Number"
                rules={[
                  {
                    required: true,
                    type: "number",
                    message: "Please input your Phone Number!",
                  },
                  {
                    type: "number",
                    message: "Please enter valid Phone Number!",
                    pattern: /^[0-9]{10}$/,
                  },
                ]}
              >
                <Input placeholder="Phone Number" maxLength={10} />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    type: "email",
                    message: "Please input valid email!",
                  },
                ]}
              >
                <Input placeholder="email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input placeholder="Password" />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>
                  I agree the{" "}
                  <a href="#pablo" className="font-bold text-dark">
                    Terms and Conditions
                  </a>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                >
                  SIGN UP
                </Button>
              </Form.Item>
            </Form>
            <p className="font-semibold text-muted text-center">
              Already have an account?{" "}
              <Link to="/" className="font-bold text-dark">
                Sign In
              </Link>
            </p>
          </Card>
        </Content>
        <Footer>
          <Menu mode="horizontal">
            <Menu.Item>Company</Menu.Item>
            <Menu.Item>About Us</Menu.Item>
            <Menu.Item>Teams</Menu.Item>
            <Menu.Item>Products</Menu.Item>
            <Menu.Item>Blogs</Menu.Item>
            <Menu.Item>Pricing</Menu.Item>
          </Menu>
          <Menu mode="horizontal" className="menu-nav-social">
            <Menu.Item>
              <Link to="#">{<DribbbleOutlined />}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">{<TwitterOutlined />}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">{<InstagramOutlined />}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">
                <svg
                  width="18"
                  height="18"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"></path>
                </svg>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">{<GithubOutlined />}</Link>
            </Menu.Item>
          </Menu>
          <p className="copyright">
            {" "}
            Copyright © 2021 Muse by <a href="#pablo">Creative Tim</a>.{" "}
          </p>
        </Footer>
      </div>
    </>
  );
};
export default SignUp;
