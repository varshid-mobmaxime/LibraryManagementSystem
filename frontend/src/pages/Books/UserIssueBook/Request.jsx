import { Avatar, Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import React from "react";
import moment from "moment";
import { FaBookOpen } from "react-icons/fa";

const Request = ({ dataList }) => {
  return (
    <div style={{ backgroundColor: "white", flex: 1 }}>
      <Table
        dataSource={dataList}
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
            <Avatar size={50} src={record?.book?.url} icon={<FaBookOpen />} />
          )}
        />
        <Column title="Book Name" dataIndex={["book", "title"]} key="title" />
        <Column
          title="Requested Date"
          dataIndex={["createdAt"]}
          key="createdAt"
          render={(createdAt) => (
            <p>{moment(createdAt).format("DD-MM-YYYY hh:mm A")}</p>
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
                  : "red"
              }
            >
              {statusName}
            </Tag>
          )}
        />
      </Table>
    </div>
  );
};

export default Request;
