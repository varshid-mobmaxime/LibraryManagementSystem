import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UserRequestBook } from "../../redux/actions/BookAction";
import { Table, Tabs, Tag } from "antd";
import Column from "antd/es/table/Column";
import Request from "./UserIssueBook/Request";
import Borrow from "./UserIssueBook/Borrow";
import Return from "./UserIssueBook/Return";

const UserRequestBooks = () => {
  const dispatch = useDispatch();

  const [requestBookList, setRequestBookList] = useState();

  useEffect(() => {
    dispatch(
      UserRequestBook((isSuccess, result) => {
        isSuccess && setRequestBookList(result);
      })
    );
  }, [dispatch]);

  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Requested Books",
      children: <Request />,
    },
    {
      key: "2",
      label: "Borrowed Books",
      children: <Borrow />,
    },
    {
      key: "3",
      label: "Returned Books",
      children: <Return />,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default UserRequestBooks;
