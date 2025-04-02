import { Tabs } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  UserCancelBook,
  UserIssueBook,
  UserRequestBook,
  UserReturnBook,
} from "../../redux/actions/BookAction";
import Borrow from "./Components/Borrow";
import Cancel from "./Components/Cancel";
import Request from "./Components/Request";
import Return from "./Components/Return";

const UserRequestBooks = () => {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("1");
  const [requestBookList, setRequestBookList] = useState();
  const [issueBookList, setIssueBookList] = useState();
  const [returnBookList, setReturnBookList] = useState();
  const [cancelBookList, setCancelBookList] = useState();

  const fetchTabData = useCallback(
    (key) => {
      if (key === "1") {
        dispatch(
          UserRequestBook((isSuccess, result) => {
            isSuccess && setRequestBookList(result);
          })
        );
      } else if (key === "2") {
        dispatch(
          UserIssueBook((isSuccess, result) => {
            isSuccess && setIssueBookList(result);
          })
        );
      } else if (key === "3") {
        dispatch(
          UserReturnBook((isSuccess, result) => {
            isSuccess && setReturnBookList(result);
          })
        );
      } else if (key === "4") {
        dispatch(
          UserCancelBook((isSuccess, result) => {
            isSuccess && setCancelBookList(result);
          })
        );
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchTabData(activeTab);
  }, [activeTab, fetchTabData]);

  useEffect(() => {
    dispatch(
      UserRequestBook((isSuccess, result) => {
        isSuccess && setRequestBookList(result);
      })
    );
  }, [dispatch]);

  const onChange = (key) => {
    setActiveTab(key);
  };

  const items = [
    {
      key: "1",
      label: "Requested Books",
      children: <Request dataList={requestBookList} />,
    },
    {
      key: "2",
      label: "Issued Books",
      children: <Borrow dataList={issueBookList} />,
    },
    {
      key: "3",
      label: "Returned Books",
      children: <Return dataList={returnBookList} />,
    },
    {
      key: "4",
      label: "Canceled Books",
      children: <Cancel dataList={cancelBookList} />,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} animated />
    </div>
  );
};

export default UserRequestBooks;
