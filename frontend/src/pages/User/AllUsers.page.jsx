import React, { useCallback, useEffect, useState } from "react";
import { Avatar, Modal, Space, Table, Tag } from "antd";
import { useDispatch } from "react-redux";
import {
  deleteUserRequest,
  getAllUserList,
} from "../../redux/actions/UserActions";
import { MdDelete } from "react-icons/md";
import { UserOutlined } from "@ant-design/icons";
import { FaRegEye } from "react-icons/fa";

import { TbEdit } from "react-icons/tb";
import { AppRoleEnum } from "../../constants/appConstant";
import { useNavigate } from "react-router-dom";
import RouteConstants from "../../constants/navigationRouteConstant";
const { Column } = Table;

const AllUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserDataList] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleOk = useCallback(
    (id) => {
      setIsModalOpen(false);
      dispatch(deleteUserRequest(id));
    },
    [dispatch]
  );

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onUserDetails = useCallback(
    (userDetails) => {
      navigate(RouteConstants.VIEW_PROFILE_PAGE, {
        state: { userInfo: userDetails },
      });
    },
    [navigate]
  );
  const onUserEdit = useCallback(
    (userDetails) => {
      navigate(RouteConstants.EDIT_USER_PROFILE, {
        state: { userInfo: userDetails },
      });
    },
    [navigate]
  );

  useEffect(() => {
    dispatch(
      getAllUserList((data) => {
        console.log("Set data is =--> ", data);

        data && setUserDataList(data);
      })
    );
  }, [dispatch]);

  useEffect(() => {
    userData?.length > 0 &&
      dispatch(
        getAllUserList((data) => {
          data && setUserDataList(data);
        })
      );
  }, [userData?.length]);

  console.log("User Details is =--> ", userData);

  return (
    <Table
      dataSource={userData}
      // key={userData}
      showSorterTooltip
      bordered
      // loading={userData ? false : true}
    >
      {/* <Column title="Avatar" dataIndex="avatar" key="avarat"></Column> */}
      <Column
        title="Avatar"
        dataIndex="avatar"
        key="avatar"
        width={100}
        render={(avatar, record) => (
          <Avatar size={64} src={avatar} icon={<UserOutlined />} />
        )}
      />
      <Column title="First Name" dataIndex="firstName" key="firstName" />
      <Column title="Last Name" dataIndex="lastName" key="lastName" />
      <Column
        title="Role"
        dataIndex="role"
        key="role"
        render={(role) => (
          <Tag color={role == AppRoleEnum.Admin ? "red" : "blue"} key={role}>
            {role.toUpperCase()}
          </Tag>
        )}
      />
      <Column title="UserName" dataIndex="userName" key="userName" />
      <Column title="Email" dataIndex="email" key="email" width={150} />
      <Column title="Phone Number" dataIndex="phoneNumber" key="phoneNumber" />

      {/* <Column title="Age" dataIndex="age" key="age" /> */}
      {/* <Column title="Address" dataIndex="address" key="address" /> */}

      <Column
        title="Action"
        key="action"
        render={(_, record) => (
          <Space size="middle">
            <MdDelete
              style={{ height: 20, width: 20, color: "red" }}
              onClick={showModal}
            />
            <TbEdit
              style={{ height: 20, width: 20 }}
              onClick={() => {
                onUserEdit(record);
              }}
            />
            <FaRegEye
              style={{ height: 20, width: 20 }}
              onClick={() => {
                onUserDetails(record);
              }}
            />
            <Modal
              title="Delete User"
              okText="Delete"
              okButtonProps={{ danger: true }}
              open={isModalOpen}
              onOk={() => {
                handleOk(record?._id);
              }}
              onCancel={handleCancel}
            >
              <p>
                Are you sure you want to delete{" "}
                <Tag color={"red"} key={record?._id}>
                  {record?.firstName} {record?.lastName}
                </Tag>
                user?
              </p>
            </Modal>
          </Space>
        )}
      />
    </Table>
  );
};

export default AllUsers;
