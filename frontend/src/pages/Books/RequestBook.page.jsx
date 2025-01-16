import { Avatar, Dropdown, Space, Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import React, { useEffect, useState } from "react";
import { AppRoleEnum } from "../../constants/appConstant";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { useDispatch } from "react-redux";
import {
  AllRequestedBookList,
  UpdateBookStatus,
} from "../../redux/actions/BookAction";
import { ToastSuccess } from "../../constants/toastConstant";

const RequestBook = () => {
  const dispatch = useDispatch();

  const [allRequestedBookList, setAllRequestedBookList] = useState();

  useEffect(() => {
    dispatch(
      AllRequestedBookList((isSuccess, data) => {
        isSuccess && setAllRequestedBookList(data);
      })
    );
  }, [dispatch]);

  const data = [
    {
      _id: "6784e92e46225e8a6e1eb7e5",
      user: {
        _id: "6780fc16df6bdaa96b5acb28",
        firstName: "Hardik",
        lastName: "Sharma",
        email: "hardik@yopmail.com",
      },
      book: {
        _id: "677fb985b131eda17c55b59e",
        title: "Think Straight ",
        author: " Darius Foroux",
      },
      status: 1,
      createdAt: "2025-01-13T10:21:34.596Z",
      updatedAt: "2025-01-13T10:21:34.596Z",
      __v: 0,
      statusName: "Pending",
    },
    {
      _id: "67850a774e9683d7445b2103",
      user: {
        _id: "6780fc16df6bdaa96b5acb28",
        firstName: "Hardik",
        lastName: "Sharma",
        email: "hardik@yopmail.com",
      },
      book: {
        _id: "677e42140e02a994b9d6d597",
        title: "ABCD",
        author: "varshid Patel",
      },
      status: 1,
      createdAt: "2025-01-13T12:43:35.574Z",
      updatedAt: "2025-01-13T12:43:35.574Z",
      __v: 0,
      statusName: "Pending",
    },
    {
      _id: "67850d744e9683d7445b2119",
      user: {
        _id: "6780fc16df6bdaa96b5acb28",
        firstName: "Hardik",
        lastName: "Sharma",
        email: "hardik@yopmail.com",
      },
      book: {
        _id: "677fc31d83b471d23d45bad8",
        title: "Don't Believe Everything You Think",
        author: " Joseph NguyenJoseph Nguyen",
      },
      status: 1,
      createdAt: "2025-01-13T12:56:20.704Z",
      updatedAt: "2025-01-13T12:56:20.704Z",
      __v: 0,
      statusName: "Pending",
    },
  ];

  const [statusName, setStatusName] = useState();

  const items = [
    {
      key: "Pending",
      value: 1,
      label: "Pending",
    },
    {
      key: "Accepted",
      value: 2,
      label: "Accepted",
    },
    {
      key: "Canceled",
      value: 3,
      label: "Canceled",
    },
  ];

  const handleMenuClick = (key, record) => {
    // Find the corresponding item by its key
    const selectedItem = items.find((item) => item.key === key);

    // Get the value from the selected item
    const value = selectedItem?.value;

    const payload = {
      bookRequestId: record?._id,
      status: value,
    };
    dispatch(
      UpdateBookStatus(payload, (isSuccess, message) => {
        if (isSuccess) {
          ToastSuccess(message);
          dispatch(
            AllRequestedBookList((isSuccess, data) => {
              isSuccess && setAllRequestedBookList(data);
            })
          );
        }
      })
    );

    console.log("Selected item key:", key);
    console.log("Selected Value:", value);
    console.log("Associated record:", record);
    // Perform logic based on selected key and record
  };

  return (
    <div>
      <Table
        dataSource={allRequestedBookList}
        rowKey={(record) => record._id}
        bordered
        pagination={{ pageSize: 5 }}
      >
        <Column title="Book Name" dataIndex={["book", "title"]} key="title" />
        <Column
          title="User Name"
          key="userName"
          render={(record) =>
            `${record?.user?.firstName || ""} ${record?.user?.lastName || ""}`
          }
        />
        <Column
          title="Email"
          dataIndex={["user", "email"]}
          key="email"
          width={200}
        />
        <Column
          title="Status"
          dataIndex="statusName"
          key="statusName"
          render={(statusName, record) => (
            <Dropdown
              menu={{
                items,
                onClick: ({ key }) => {
                  handleMenuClick(key, record); // Pass both the key and the record
                },
              }}
              trigger={["click"]}
              //   menu={() => {

              //     menuProps(record?._id);
              //   }}
              //   trigger={["click"]}
            >
              <a
                onClick={
                  (e) => {
                    console.log("E is =--> ", e);
                  }

                  //   e.preventDefault()
                }
              >
                <Tag
                  color={
                    statusName === "Pending"
                      ? "blue"
                      : statusName === "Accepted"
                      ? "green"
                      : "red"
                  }
                >
                  {statusName}
                </Tag>
              </a>
            </Dropdown>
          )}
        />
      </Table>
    </div>
  );
};

export default RequestBook;
