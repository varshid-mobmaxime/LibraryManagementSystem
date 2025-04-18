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
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
  Tag,
  Space,
  Modal,
} from "antd";

import { ToTopOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

// Images
import ava1 from "../assets/images/logo-shopify.svg";
import ava2 from "../assets/images/logo-atlassian.svg";
import ava3 from "../assets/images/logo-slack.svg";
import ava5 from "../assets/images/logo-jira.svg";
import ava6 from "../assets/images/logo-invision.svg";
import face from "../assets/images/face-1.jpg";
import face2 from "../assets/images/face-2.jpg";
import face3 from "../assets/images/face-3.jpg";
import face4 from "../assets/images/face-4.jpg";
import face5 from "../assets/images/face-5.jpeg";
import face6 from "../assets/images/face-6.jpeg";
import pencil from "../assets/images/pencil.svg";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import {
  deleteUserRequest,
  getAllUserList,
} from "../../../frontendd/src/redux/actions/UserActions";
import RouteConstants from "../constants/navigationRouteConstant";
import Column from "antd/lib/table/Column";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa";
import { AppRoleEnum } from "../constants/appConstant";
import EditUserDetails from "../components/EditUserDetails";

const { Title } = Typography;

const formProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
// table code start
const columns = [
  {
    title: "AVATAR",
    dataIndex: "name",
    key: "name",
    // width: "32%",
  },
  {
    title: "NAME",
    dataIndex: "function",
    key: "function",
  },
  {
    title: "EMAIL",
    dataIndex: "function",
    key: "function",
  },

  {
    title: "USERNAME",
    dataIndex: "function",
    key: "function",
  },
  {
    title: "STATUS",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "EMPLOYED",
    key: "employed",
    dataIndex: "employed",
  },
];

const data = [
  {
    key: "1",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face2}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>Michael John</Title>
            <p>michael@mail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Manager</Title>
          <p>Organization</p>
        </div>
      </>
    ),

    status: (
      <>
        <Button type="primary" className="tag-primary">
          ONLINE
        </Button>
      </>
    ),
    employed: (
      <>
        <div className="ant-employed">
          <span>23/04/18</span>
          <a href="#pablo">Edit</a>
        </div>
      </>
    ),
  },

  {
    key: "2",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face3}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>Alexa Liras</Title>
            <p>alexa@mail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Programator</Title>
          <p>Developer</p>
        </div>
      </>
    ),

    status: (
      <>
        <Button className="tag-badge">ONLINE</Button>
      </>
    ),
    employed: (
      <>
        <div className="ant-employed">
          <span>23/12/20</span>
          <a href="#pablo">Edit</a>
        </div>
      </>
    ),
  },

  {
    key: "3",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>Laure Perrier</Title>
            <p>laure@mail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Executive</Title>
          <p>Projects</p>
        </div>
      </>
    ),

    status: (
      <>
        <Button type="primary" className="tag-primary">
          ONLINE
        </Button>
      </>
    ),
    employed: (
      <>
        <div className="ant-employed">
          <span>03/04/21</span>
          <a href="#pablo">Edit</a>
        </div>
      </>
    ),
  },
  {
    key: "4",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face4}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>Miriam Eric</Title>
            <p>miriam@mail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Marketing</Title>
          <p>Organization</p>
        </div>
      </>
    ),

    status: (
      <>
        <Button type="primary" className="tag-primary">
          ONLINE
        </Button>
      </>
    ),
    employed: (
      <>
        <div className="ant-employed">
          <span>03/04/21</span>
          <a href="#pablo">Edit</a>
        </div>
      </>
    ),
  },
  {
    key: "5",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face5}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>Richard Gran</Title>
            <p>richard@mail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Manager</Title>
          <p>Organization</p>
        </div>
      </>
    ),

    status: (
      <>
        <Button className="tag-badge">ONLINE</Button>
      </>
    ),
    employed: (
      <>
        <div className="ant-employed">
          <span>23/03/20</span>
          <a href="#pablo">Edit</a>
        </div>
      </>
    ),
  },

  {
    key: "6",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face6}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>John Levi</Title>
            <p>john@mail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Tester</Title>
          <p>Developer</p>
        </div>
      </>
    ),

    status: (
      <>
        <Button className="tag-badge">ONLINE</Button>
      </>
    ),
    employed: (
      <>
        <div className="ant-employed">
          <span>14/04/17</span>
          <a href="#pablo">Edit</a>
        </div>
      </>
    ),
  },
];
// project table start
const project = [
  {
    title: "COMPANIES",
    dataIndex: "name",
    width: "32%",
  },
  {
    title: "BUDGET",
    dataIndex: "age",
  },
  {
    title: "STATUS",
    dataIndex: "address",
  },
  {
    title: "COMPLETION",
    dataIndex: "completion",
  },
];
const dataproject = [
  {
    key: "1",

    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava1} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}>Spotify Version</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$14,000</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">working</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={30} size="small" />
          <span>
            <Link to="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "2",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava2} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}>Progress Track</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$3,000</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">working</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={10} size="small" />
          <span>
            <Link to="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "3",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava3} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}> Jira Platform Errors</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">Not Set</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">done</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={100} size="small" format={() => "done"} />
          <span>
            <Link to="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "4",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}> Launch new Mobile App</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$20,600</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">canceled</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress
            percent={50}
            size="small"
            status="exception"
            format={() => "50%"}
          />
          <span>
            <Link to="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "5",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}>Web Dev</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$4,000</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">working</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={80} size="small" />
          <span>
            <Link to="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "6",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava6} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}>Redesign Online Store</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$2,000</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">canceled</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={0} size="small" />
          <span>
            <Link to="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },
];

function Tables() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserDataList] = useState();
  const [adminData, setAdminDataList] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUser, setIsUser] = useState(true);

  const [open, setOpen] = useState(false);
  const showEditUserDrawer = () => {
    setOpen(true);
  };
  const onCloseEditUserDrawer = () => {
    setOpen(false);
  };

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
      navigate(RouteConstants.VIEW_USER_PROFILE_PAGE, {
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
        const userList = data && data?.filter((i) => i.role === "user");
        const adminList = data && data?.filter((i) => i.role === "admin");
        setUserDataList(userList);
        setAdminDataList(adminList);
      })
    );
  }, [dispatch]);

  useEffect(() => {
    userData?.length > 0 &&
      dispatch(
        getAllUserList((data) => {
          const userList = data && data?.filter((i) => i.role === "user");
          const adminList = data && data?.filter((i) => i.role === "admin");
          setUserDataList(userList);
          setAdminDataList(adminList);
          // data && setUserDataList(data);
        })
      );
  }, [userData?.length]);

  console.log("User Details is =--> ", userData);

  const onChange = (e) => {
    setIsUser(e.target.value);
  };

  return (
    <>
      <div className="tabled" style={{ marginBottom: 100 }}>
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="All User Table"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue={true}>
                    <Radio.Button value={true}>User</Radio.Button>
                    <Radio.Button value={false}>Admin</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                {/* <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  className="ant-border-space"
                /> */}
                <Table
                  className="ant-border-space"
                  dataSource={isUser ? userData : adminData}
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
                      <Avatar
                        size={64}
                        src={avatar}
                        draggable={false}
                        shape="square"
                        icon={<UserOutlined />}
                      />
                    )}
                  />
                  <Column
                    title="First Name"
                    dataIndex="firstName"
                    key="firstName"
                  />
                  <Column
                    title="Last Name"
                    dataIndex="lastName"
                    key="lastName"
                  />
                  <Column
                    title="Role"
                    dataIndex="role"
                    key="role"
                    render={(role) => (
                      <Tag
                        color={role == AppRoleEnum.Admin ? "red" : "blue"}
                        key={role}
                      >
                        {role.toUpperCase()}
                      </Tag>
                    )}
                  />
                  <Column
                    title="UserName"
                    dataIndex="userName"
                    key="userName"
                  />
                  <Column
                    title="Email"
                    dataIndex="email"
                    key="email"
                    width={150}
                  />
                  <Column
                    title="Phone Number"
                    dataIndex="phoneNumber"
                    key="phoneNumber"
                  />

                  {/* <Column title="Age" dataIndex="age" key="age" /> */}
                  {/* <Column title="Address" dataIndex="address" key="address" /> */}

                  <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                      <Space size="middle" align="center">
                        {record.role === "user" && (
                          <MdDelete
                            style={{ height: 20, width: 20, color: "red" }}
                            onClick={showModal}
                          />
                        )}
                        {record.role === "user" && (
                          <TbEdit
                            style={{ height: 20, width: 20 }}
                            onClick={showEditUserDrawer}
                            // onClick={() => {
                            //   onUserEdit(record);
                            // }}
                          />
                        )}

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
              </div>
            </Card>
          </Col>
        </Row>
        <EditUserDetails
          isOpen={open}
          onClose={onCloseEditUserDrawer}
        ></EditUserDetails>
      </div>
    </>
  );
}

export default Tables;
