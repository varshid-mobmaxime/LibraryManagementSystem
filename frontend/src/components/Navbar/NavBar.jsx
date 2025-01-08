import React, { useCallback, useState } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { IoKeyOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Dropdown, Modal, Space } from "antd";
import { ToastSuccess } from "../../constants/toastConstant";
import { LOGOUT } from "../../redux/actionTypes";

const NavBar = () => {
  const { userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleOk = useCallback(() => {
    setIsModalOpen(false);
    dispatch({ type: LOGOUT });
    ToastSuccess("Logout successfully.");
  }, [dispatch]);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const navigateToPages = useCallback(
    (key) => {
      switch (key) {
        case 1:
          return navigate("/view-profile");

        case 2:
          return navigate("/change-password");

        case 3:
          return showModal();

        default:
          navigate("/");
      }
    },
    [navigate, showModal]
  );

  const items = [
    {
      key: "1",
      label: (
        <p
          onClick={() => {
            navigateToPages(1);
          }}
          // target="/Books"
          // rel="noopener noreferrer"
          // href="https://www.antgroup.com"
        >
          View Profile
        </p>
      ),
      icon: <FaRegUser style={{ height: 15, width: 15 }} color="gray" />,
    },
    {
      key: "2",
      label: (
        <p
          onClick={() => {
            navigateToPages(2);
          }}
        >
          Change Password
        </p>
      ),
      icon: <IoKeyOutline style={{ height: 19, width: 19 }} color="gray" />,
    },
    {
      key: "3",
      label: (
        <p
          onClick={() => {
            navigateToPages(3);
          }}
        >
          Logout
        </p>
      ),
      icon: <AiOutlinePoweroff style={{ height: 19, width: 19 }} color="red" />,
      danger: true,
    },
  ];
  return (
    <div className="flex bg-zinc-800 text-white px-8 py-3 items-center justify-between">
      <div
        className="flex items-center"
        onClick={() => navigate("/", { replace: true })}
      >
        <img
          className="h-10 me-4"
          alt="logo"
          src="https://imgs.search.brave.com/xMDqouvjhK1qzeXjpubi39BivUxUAgm1DTh6tUzhoY4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbmcu/cG5ndHJlZS5jb20v/cG5nLXZlY3Rvci8y/MDIxMTEyOC9vdXJt/aWQvcG5ndHJlZS1l/ZHVjYXRpb24tbG9n/by1tYWRlLWZyb20t/Ym9vay1hbmQtdHJl/ZS1vZi1rbm93bGVk/Z2UtcG5nLWltYWdl/XzQwNDMwOTEucG5n"
        />
        <h1 className="text-2xl font-semibold">Library Management</h1>
      </div>
      {userData ? (
        <div>
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <img
                  style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
                  // className="h-10 me-4 rounded"
                  alt="logo"
                  src={userData?.avatar}
                />
              </Space>
            </a>
          </Dropdown>
        </div>
      ) : (
        <div className="flex gap-4">
          <button
            onClick={() => navigate("Signin")}
            className="px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            Sign-in
          </button>
          <button
            onClick={() => navigate("Register")}
            className="px-2 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            Register
          </button>
        </div>
      )}
      <Modal
        title="Log out"
        okText="Logout"
        okButtonProps={{ danger: true }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </div>
  );
};

export default NavBar;
