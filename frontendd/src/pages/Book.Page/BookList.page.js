import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllBooksList } from "../../redux/actions/BookAction";
import { Button, Card, List, Typography } from "antd";
import { PlusOutlined, ReadOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import RouteConstants from "../../constants/navigationRouteConstant";
import AddBook from "../../components/AddBook.Component";
import Search from "antd/es/transfer/search";

const { Title } = Typography;

const BookList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin } = useSelector((state) => state.auth);
  const [bookList, setBookList] = useState();
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const showAddBookDrawer = () => {
    setOpen(true);
  };
  const onCloseAddBookDrawer = () => {
    setOpen(false);
  };

  const onReadMorePress = useCallback(
    (id) => {
      navigate(RouteConstants.USER_BOOK_DETAIL_PAGE, {
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
        setBookList(isSuccess ? result?.books : []);
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getAllBooksList(search, (isSuccess, result) => {
        setBookList(isSuccess ? result?.books : []);
      })
    );
  }, [search]);

  return (
    <div className="container">
      <nav class="navbar bg-light mb-3">
        <div class="container-fluid">
          <a class="navbar-brand">Book List</a>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search Book..."
              value={search}
              aria-label="Search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button
              hidden={!search}
              class="btn btn-outline-danger"
              type="button"
              onClick={() => {
                setSearch("");
              }}
            >
              Clear
            </button>
          </form>
        </div>
      </nav>
      <div className="mb-2" hidden={!isAdmin}>
        <Button
          variant="solid"
          icon={<PlusOutlined />}
          color="purple"
          onClick={showAddBookDrawer}
        >
          Add Book
        </Button>
      </div>
      <List
        grid={{
          gutter: 16,
          column: 4,
          xxl: 5,
          xl: 4,
          md: 3,
          lg: 2,
          sm: 2,
          xs: 1,
        }}
        dataSource={bookList}
        renderItem={(item) => (
          <div
            className="card mx-2 mb-2"
            onClick={() => {
              onReadMorePress(item?._id);
            }}
          >
            <img
              className="card-img-top img-fluid"
              draggable={false}
              style={{ height: 400 }}
              src={item?.url}
              alt={item?.title}
            />
            <div className="card-body" style={{ height: 60 }}>
              <Title level={5} ellipsis>
                {item?.title}
              </Title>
              {/* <p className="card-text" >
              
              </p> */}
            </div>
          </div>
        )}
      />
      {bookList &&
        bookList.map((data) => {
          return (
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-5 mb-lg-3">
              {/* <Card
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
              </Card> */}
            </div>
          );
        })}
      <AddBook isOpen={open} onClose={onCloseAddBookDrawer} />
    </div>
  );
};

export default BookList;
