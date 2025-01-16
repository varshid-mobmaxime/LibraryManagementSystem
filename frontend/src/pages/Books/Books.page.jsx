import { ReadOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllBooksList } from "../../redux/actions/BookAction";

const Books = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [bookList, setBookList] = useState();

  console.log("BookList is =--> ", bookList);

  const onReadMorePress = useCallback(
    (id) => {
      navigate("/book-details", {
        state: {
          id,
        },
      });
    },
    [navigate]
  );

  useEffect(() => {
    dispatch(
      getAllBooksList((isSuccess, result) => {
        console.log("Book sis =--> ", result?.books);

        setBookList(isSuccess ? result?.books : []);
      })
    );
  }, [dispatch]);
  return (
    <div className="row">
      {bookList &&
        bookList.map((data) => {
          return (
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-5 mb-lg-3">
              <Card
                hoverable
                className="d-block border"
                cover={
                  <img
                    alt="example"
                    src={data.url}
                    style={{
                      minHeight: "300px",
                      maxHeight: "300px",
                    }}
                  />
                }
                actions={[
                  <ReadOutlined
                    key="read more"
                    onClick={() => {
                      onReadMorePress(data?._id);
                    }}
                  />,
                ]}
              >
                <div>{data.title}</div>
              </Card>
            </div>
          );
        })}
    </div>
  );
};

export default Books;
