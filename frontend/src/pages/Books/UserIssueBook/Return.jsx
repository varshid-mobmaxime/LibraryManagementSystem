import { Avatar, Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import React from "react";
import moment from "moment";
import { FaBookOpen } from "react-icons/fa";

const Return = ({ dataList }) => {
  return (
    <div>
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
          title="Return Date"
          dataIndex={["returnDate"]}
          key="returnDate"
          render={(returnDate) => (
            <p>{moment(returnDate).format("DD-MM-YYYY hh:mm A")}</p>
          )}
        />
        <Column
          title="Overdue charge"
          dataIndex={["penalty"]}
          key="Penalty"
          render={(penalty) => <p>₹ {penalty}</p>}
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
                  : statusName === "Accept"
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
  );
};

export default Return;
