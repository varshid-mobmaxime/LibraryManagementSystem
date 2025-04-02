import { Avatar, Dropdown, Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaBookOpen } from "react-icons/fa6";
import { BookRequestEnum } from "../../constants/appConstant";
import {
  AllRequestedBookList,
  UpdateBookStatus,
} from "../../redux/actions/BookAction";
import { ToastSuccess } from "../../constants/toastConstant";
import { useDispatch } from "react-redux";

const BookRequest = () => {
  const dispatch = useDispatch();

  const [allRequestedBookList, setAllRequestedBookList] = useState();

  useEffect(() => {
    dispatch(
      AllRequestedBookList((isSuccess, data) => {
        isSuccess && setAllRequestedBookList(data);
      })
    );
  }, [dispatch]);

  const items = [
    {
      key: "Pending",
      value: 1,
      label: "Pending",
    },
    {
      key: "Issue",
      value: 2,
      label: "Issue",
    },
    {
      key: "Cancel",
      value: 3,
      label: "Cancel",
    },
    {
      key: "Return",
      value: 4,
      label: "Return",
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
    // Perform logic based on selected key and record
  };
  return (
    <div className="mb-5">
      <Table
        dataSource={allRequestedBookList}
        rowKey={(record) => record._id}
        bordered
        pagination={{ pageSize: 10 }}
      >
        <Column
          title="Book Avatar"
          dataIndex={["url"]}
          key="url"
          width={100}
          render={(url, record) => (
            <Avatar size={50} src={record?.book?.url} icon={<FaBookOpen />} />
          )}
        />
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
            <Dropdown
              menu={{
                items,
                onClick: ({ key }) => {
                  handleMenuClick(key, record);
                },
              }}
              trigger={["click"]}
            >
              <a>
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
              </a>
            </Dropdown>
          )}
        />
      </Table>
    </div>
  );
};

export default BookRequest;
