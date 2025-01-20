import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Avatar, Image, message, Table, Tag, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useLocation } from "react-router-dom";
import { AppRoleEnum, BookRequestEnum } from "../../constants/appConstant";
import "./viewProfile.css";
import Column from "antd/es/table/Column";
import { FaBookOpen } from "react-icons/fa";
import { UserAllBook } from "../../redux/actions/BookAction";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { UpdateProfilePic } from "../../redux/actions/ProfileActions";

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
  const { state } = useLocation();
  const { userInfo } = state || {};

  const [userDetails, setUserDetails] = useState();

  console.log("userDetails is =--> ", userDetails);

  useEffect(() => {
    setUserDetails(userInfo || userData);
    setImageUrl(userInfo?.avatar || userData?.avatar);
  }, [userData, userInfo]);

  const [requestBookList, setRequestBookList] = useState();

  useEffect(() => {
    dispatch(
      UserAllBook(userInfo?._id, (isSuccess, result) => {
        isSuccess && setRequestBookList(result);
      })
    );
  }, [dispatch, userInfo?._id]);

  return (
    <div className="container mt-5">
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
        </div>
        <div className="mt-4">
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                value={userDetails?.firstName}
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                value={userDetails?.lastName}
                readOnly
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-12">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={userDetails?.userName}
                readOnly
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                value={userDetails?.phoneNumber}
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={userDetails?.email}
                readOnly
              />
            </div>
          </div>
        </div>
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
