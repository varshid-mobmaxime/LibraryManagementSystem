import { PlusOutlined } from "@ant-design/icons";
import {
  Avatar,
  Card,
  Col,
  Divider,
  Image,
  message,
  Row,
  Table,
  Tag,
  Typography,
  Upload,
} from "antd";
import ImgCrop from "antd-img-crop";
import Column from "antd/es/table/Column";
import moment from "moment";
import { FaShoppingCart } from "react-icons/fa";
import { GiCancel, GiReturnArrow } from "react-icons/gi";

import React, { useEffect, useState } from "react";
import { FaBookOpen, FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AppRoleEnum, BookRequestEnum } from "../../constants/appConstant";
import { UserAllBook } from "../../redux/actions/BookAction";
import {
  GetUserBookHistory,
  UpdateProfilePic,
} from "../../redux/actions/ProfileActions";
import "./viewProfile.css";
import { MdOutlineMailOutline, MdOutlinePhoneAndroid } from "react-icons/md";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

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

const ViewProfile = () => {
  const dispatch = useDispatch();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    console.log("Info is =--> ", info);

    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      const payload = {
        avatar: info?.file?.response?.url,
      };
      info?.file?.response?.success &&
        dispatch(
          UpdateProfilePic(payload, (isSuccess) => {
            setLoading(false);
            setImageUrl(info?.file?.response?.url);
          })
        );

      // Get this url from response in real world.

      // getBase64(info.file.originFileObj, (url) => {
      //   setImageUrl(url);
      // });
    }
  };
  // const uploadButton = (
  //   <button
  //     style={{
  //       border: 0,
  //       background: "none",
  //     }}
  //     type="button"
  //   >
  //     {loading ? <LoadingOutlined /> : <PlusOutlined />}
  //     <div
  //       style={{
  //         marginTop: 8,
  //       }}
  //     >
  //       Upload
  //     </div>
  //   </button>
  // );

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
      className="profile-pic-container border border-5"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Profile
      </div>
    </button>
  );

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const { userData } = useSelector((state) => state.auth);
  const { buttonColor } = useSelector((state) => state.theme);
  const { state } = useLocation();
  const { userInfo } = state || {};

  const [userDetails, setUserDetails] = useState();
  const [bookHistory, setBookHistory] = useState();
  const [requestBookList, setRequestBookList] = useState();

  console.log("userDetails is =--> ", userDetails);

  useEffect(() => {
    setUserDetails(userInfo || userData);
    setImageUrl(userInfo?.avatar || userData?.avatar);
  }, [userData, userInfo]);

  useEffect(() => {
    dispatch(
      GetUserBookHistory(userDetails?._id, (isSuccess, result) => {
        isSuccess && setBookHistory(result);
      })
    );
  }, [dispatch, userDetails]);

  useEffect(() => {
    dispatch(
      UserAllBook(userDetails?._id, (isSuccess, result) => {
        isSuccess && setRequestBookList(result);
      })
    );
  }, [dispatch, userDetails?._id]);

  const count = [
    {
      today: "Total Borrowed Books",
      title: bookHistory?.BorrowedBooks,
      icon: <FaShoppingCart style={{ height: 25, width: 25 }} />,
      bnb: "bnb2",
    },
    {
      today: "Total Requested Books",
      title: bookHistory?.RequestedBooks,
      icon: <FaCartArrowDown style={{ height: 25, width: 25 }} />,
      bnb: "bnb2",
    },
    {
      today: "Total Returned Books",
      title: bookHistory?.ReturnedBooks,
      icon: <GiReturnArrow style={{ height: 25, width: 25 }} />,
      bnb: "bnb2",
    },
    {
      today: "Total Cancelled Books",
      title: bookHistory?.CancelledBooks,
      icon: <GiCancel style={{ height: 25, width: 25 }} />,
      bnb: "redtext",
    },
  ];

  const { Title } = Typography;

  return (
    <div className="container ">
      <div className="profile-card shadow-lg p-4 my-4 rounded">
        <div className="text-center">
          <div className="profile-pic-container">
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
                name="file"
                // listType="picture-circle"
                // className="avatar-uploader"
                onPreview={handlePreview}
                showUploadList={false}
                action="http://localhost:5001/media-upload/profile"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <div>
                    <img
                      src={userDetails?.avatar}
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
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{
                    display: "none",
                  }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </ImgCrop>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <h3 className="mt-3 ">
              {`${userDetails?.firstName} ${userDetails?.lastName}`}
            </h3>
            <Tag
              className="ms-2"
              color={userDetails?.role === AppRoleEnum.Admin ? "red" : "blue"}
              key={userDetails?.role}
            >
              {userDetails?.role.toUpperCase()}
            </Tag>
          </div>
          <p className="text-muted">@{userDetails?.userName}</p>
          <div className="flex justify-content-center row">
            <div className="col-5 d-flex justify-content-end align-items-center">
              <MdOutlineMailOutline style={{ height: 20, width: 20 }} />
              <p className="text-black m-0 ms-1">{userDetails?.email}</p>
            </div>
            <div
              className="col-1"
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Divider
                style={{ height: "100%" }}
                variant="solid"
                orientation="center"
                type="vertical"
              ></Divider>
            </div>
            <div className="col-5 col-5 d-flex justify-content-start">
              <MdOutlinePhoneAndroid style={{ height: 20, width: 20 }} />

              <p className="text-black m-0 ms-1">{userDetails?.phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count?.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>{c.title}</Title>
                    </Col>
                    <Col xs={6}>
                      <div
                        className="icon-box"
                        style={{ backgroundColor: buttonColor }}
                      >
                        {c.icon}
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {userInfo && userData?.role === AppRoleEnum.Admin && (
        <div className="mb-5">
          <Table
            dataSource={requestBookList}
            rowKey={(record) => record._id}
            bordered
            pagination={{ pageSize: 5 }}
          >
            <Column
              title="Book Avatar"
              dataIndex={["url"]}
              key="url"
              width={100}
              render={(url, record) => (
                <Avatar
                  size={50}
                  src={record?.book?.url}
                  icon={<FaBookOpen />}
                />
              )}
            />
            <Column
              title="Book Name"
              dataIndex={["book", "title"]}
              key="title"
            />
            <Column
              title="Requested Date"
              dataIndex={["createdAt"]}
              key="createdAt"
              render={(createdAt) => (
                <p>{moment(createdAt).format("DD-MM-YYYY hh:mm A")}</p>
              )}
            />
            <Column
              title="Issue Date"
              dataIndex={["issueDate"]}
              key="issueDate"
              render={(issueDate, record) => (
                <p>
                  {record?.status !== BookRequestEnum.Pending &&
                  record?.status !== BookRequestEnum.Cancel
                    ? moment(issueDate).format("DD-MM-YYYY hh:mm A")
                    : "-"}
                </p>
              )}
            />
            <Column
              title="Return / Expected Return Date"
              dataIndex={["returnDate"]}
              key="returnDate"
              render={(returnDate, record) => (
                <div>
                  <p>
                    {record?.status !== BookRequestEnum.Pending &&
                    record?.status !== BookRequestEnum.Cancel
                      ? moment(returnDate).format("DD-MM-YYYY hh:mm A")
                      : "-"}
                  </p>
                </div>
              )}
            />
            <Column
              title="Status"
              dataIndex="statusName"
              key="statusName"
              render={(statusName, record) => (
                <Tag
                  color={
                    statusName === "Pending"
                      ? "blue"
                      : statusName === "Issue"
                      ? "green"
                      : statusName === "Return"
                      ? "orange"
                      : "red"
                  }
                >
                  {statusName}
                </Tag>
              )}
            />
          </Table>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
