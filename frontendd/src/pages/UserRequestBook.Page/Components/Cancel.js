import { Avatar, Table } from "antd";
import Column from "antd/es/table/Column";
import React from "react";
import moment from "moment";
import { FaBookOpen } from "react-icons/fa";

const Cancel = ({ dataList }) => {
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
          title="Cancel Date"
          dataIndex={["issueDate"]}
          key="issueDate"
          render={(issueDate) => (
            <p>{moment(issueDate).format("DD-MM-YYYY hh:mm A")}</p>
          )}
        />
      </Table>
    </div>
  );
};

export default Cancel;
