import { Button, Flex, Image, Modal, Rate, Steps } from "antd";
import moment from "moment";
import React, { useEffect, useMemo } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever, MdFavorite, MdFavoriteBorder } from "react-icons/md";

import AddBook from "../../components/AddBook.Component";
import { BookRequestEnum } from "../../constants/appConstant";
import "./BookDetails.css";
import useBookDetails from "./hooks/useBookDetails";

const BookDetails = () => {
  const {
    open,
    bookDetails,
    buttonColor,
    isAdmin,
    isModalOpen,
    rate,
    showModal,
    handleOk,
    handleCancel,
    onRequestBook,
    showAddBookDrawer,
    onFavBook,
    onCloseAddBookDrawer,
    onBookRating,
  } = useBookDetails();

  const {
    title,
    desc,
    availableCopies,
    url,
    author,
    language,
    rating,
    isFavourite,
    status,
    requestedDate,
    returnDate,
    issueDate,
    cancelDate,
  } = bookDetails || {};

  console.log("Bok Details is =--> ", bookDetails);

  const item = useMemo(
    () => [
      {
        title: "Request",
        description: `Requested at ${moment(requestedDate).format(
          "DD-MM-YYYY hh:mm A"
        )}`,
      },
      {
        title: "Issue",
        description:
          status === BookRequestEnum.Issue
            ? `Issued at : ${moment(issueDate).format("DD-MM-YYYY hh:mm A")}`
            : status === BookRequestEnum.Cancel
            ? "Canceled"
            : "Waiting for admin approval",
      },
      {
        title: "Return",
        description:
          status === BookRequestEnum.Issue
            ? `Expected Return Date ${moment(returnDate).format(
                "DD-MM-YYYY hh:mm A"
              )}`
            : "Waiting for admin approval",
      },
    ],
    [requestedDate, issueDate, returnDate, status]
  );

  useEffect(() => {
    if (status === BookRequestEnum.Cancel) {
      item.splice(-1, 1, {
        title: "Canceled",
        description: (
          <div>
            {`Admin Canceled your book request at ${moment(cancelDate).format(
              "DD-MM-YYYY hh:mm A"
            )}. If you want to request again then use below button.`}
            <div style={{ marginTop: "10px" }}>
              <Button
                onClick={onRequestBook}
                type="dashed"
                variant="solid"
                color="cyan"
              >
                Request Again
              </Button>
            </div>
          </div>
        ),
      });
    }
  }, [cancelDate, item, onRequestBook, status]);

  return (
    <div className="container-fluid bg-gradient pb-5">
      <div className="row book-card">
        {/* Left Section - Book Cover */}
        <div className="col-lg-4 col-md-6 col-sm-12 d-block ">
          <Image
            className="card-img-top book-cover shadow-lg"
            width={300}
            height={500}
            src={url}
            preview={{
              src: url,
            }}
            children={() => <p>Book Cover</p>}
          ></Image>
          <div
            hidden={
              status === BookRequestEnum.NotRequested ||
              status === BookRequestEnum.Return
            }
          >
            <p className="mt-5">Book Status</p>
            <Steps
              current={status - 1}
              progressDot
              status={status === BookRequestEnum.Cancel ? "error" : "finish"}
              direction="vertical"
              responsive
              items={item}
            />
          </div>
          {!isAdmin && (
            <div className="d-flex me-5 align-items-center justify-content-center">
              <Button
                hidden={
                  status !== BookRequestEnum.NotRequested &&
                  status !== BookRequestEnum.Return
                }
                variant="solid"
                className=" width-100"
                style={{
                  marginTop: 10,
                  justifyContent: "end",
                  backgroundColor: buttonColor,
                  color: "white",
                  borderRadius: 5,
                }}
                onClick={onRequestBook}
              >
                Request Book
              </Button>
            </div>
          )}

          {/* <img
            src={bookDetails?.url} // Replace with actual image URL
            alt="Book Cover"
            className="card-img-top book-cover shadow-lg"
          /> */}
        </div>

        {/* Right Section - Book Details */}
        <div className="col-lg-8 col-md-6 col-sm-12 text-white">
          <div className="book-details">
            <div className="row d-flex align-items-center justify-content-between">
              <div className="col-7 ">
                <h6 className="badge bg-warning text-dark py-2 px-3 rounded-pill shadow-sm">
                  Available Copies : {availableCopies}
                </h6>
                <div className="ms-2 badge text-dark py-2 px-3 rounded-pill shadow-sm ">
                  <Flex align="center" className="gap-2">
                    {rating?.averageRating}
                    <Rate
                      count={5}
                      disabled
                      allowHalf
                      defaultValue={rating?.averageRating}
                      value={rating?.averageRating}
                      style={{ fontSize: 15 }}
                    />
                    <span>({rating?.totalRatings})</span>
                  </Flex>
                </div>
              </div>
              <div className="col-5 ">
                {/* Price and Actions */}
                <div className="d-flex align-items-center gap-3">
                  {isAdmin && (
                    <FaRegEdit
                      onClick={showAddBookDrawer}
                      style={{ height: 30, width: 30, color: "orange" }}
                    ></FaRegEdit>
                  )}

                  <div className="d-flex align-items-center gap-3">
                    {isAdmin && (
                      <MdDeleteForever
                        onClick={showModal}
                        style={{
                          height: 30,
                          width: 30,
                          color: "red",
                        }}
                      />
                    )}
                    {!isAdmin && (
                      <div>
                        {isFavourite ? (
                          <MdFavorite
                            onClick={onFavBook}
                            style={{ height: 35, width: 35, color: "red" }}
                          />
                        ) : (
                          <MdFavoriteBorder
                            onClick={onFavBook}
                            style={{ height: 35, width: 35, color: "red" }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <h2 className="mt-4 fw-bold">{title}</h2>
            <h4 className="text-secondary fst-italic">(By {author})</h4>

            <div className=" d-flex justify-content-start align-items-center gap-2 bg">
              <p style={{ color: "gray", fontSize: 15 }}>Language: </p>
              <p style={{ fontSize: 16, fontWeight: "bold" }}> {language}</p>
            </div>

            <div className="align-items-center gap-2">
              <Rate
                allowHalf
                defaultValue={rating?.userRating}
                value={rate}
                style={{ fontSize: 40 }}
                onChange={onBookRating}
              />
            </div>

            <p className="description text-body fs-5">{desc}</p>
          </div>
        </div>
      </div>
      <AddBook
        isOpen={open}
        onClose={onCloseAddBookDrawer}
        data={bookDetails}
      />
      <Modal
        title="Delete Book"
        okText="Delete"
        okButtonProps={{ danger: true }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this book?</p>
      </Modal>
    </div>
  );
};

export default BookDetails;
