import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Table } from "antd";
import Column from "antd/es/table/Column";
import React, { useCallback, useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RouteConstants from "../../constants/navigationRouteConstant";
import { getFavouriteBooksList } from "../../redux/actions/BookAction";

const FavBooks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [bookList, setBookList] = useState();

  console.log("BookList is =--> ", bookList);

  const onBookDetailsPress = useCallback(
    (id) => {
      navigate(RouteConstants.USER_FAV_BOOK_DETAIL_PAGE, {
        state: {
          id,
        },
      });
    },
    [navigate]
  );

  useEffect(() => {
    dispatch(
      getFavouriteBooksList((isSuccess, result) => {
        setBookList(isSuccess ? result?.books : []);
      })
    );
  }, [dispatch]);
  return (
    <div>
      <Table
        className="ant-border-space"
        dataSource={bookList}
        showSorterTooltip
        bordered
        loading={bookList ? false : true}
      >
        <Column
          title="Book Avatar"
          dataIndex="url"
          key="url"
          width={100}
          render={(url, record) => (
            <Avatar
              size={64}
              src={url}
              draggable={false}
              shape="square"
              icon={<UserOutlined />}
            />
          )}
        />
        <Column title="Book Title" dataIndex="title" key="title" />
        <Column title="Book Author" dataIndex="author" key="author" />
        <Column title="Book language" dataIndex="language" key="language" />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <FaRegEye
                style={{ height: 20, width: 20 }}
                onClick={() => {
                  onBookDetailsPress(record?._id);
                }}
              />
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default FavBooks;
