import { Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import React from "react";

const Borrow = () => {
  return (
    <div>
      <Table
        // dataSource={requestBookList}
        rowKey={(record) => record._id}
        bordered
        pagination={{ pageSize: 5 }}
      >
        <Column title="Book Name" dataIndex={["book", "title"]} key="title" />
        <Column
          title="Status"
          dataIndex="statusName"
          key="statusName"
          render={(statusName, record) => (
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
          )}
        />
      </Table>
    </div>
  );
};

export default Borrow;
