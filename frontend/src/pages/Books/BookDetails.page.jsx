import React, { useCallback, useEffect, useState } from "react";
import { MdDelete, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Modal, Tag } from "antd";
import RouteConstants from "../../constants/navigationRouteConstant";
import { ToastError, ToastSuccess } from "../../constants/toastConstant";
import {
  BookFavourite,
  DeleteBookRequest,
  getBookDetails,
  RequestBook,
} from "../../redux/actions/BookAction";
import { BookRequestEnum } from "../../constants/appConstant";

const BookDetails = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin } = useSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleOk = useCallback(() => {
    setIsModalOpen(false);
    dispatch(
      DeleteBookRequest(state?.id, (isSuccess, message) => {
        isSuccess && ToastSuccess(message);
        isSuccess && navigate(-1);
      })
    );
  }, [dispatch, navigate, state?.id]);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  console.log("isAdmin is =--> ", isAdmin);

  const [bookDetails, setBookDetails] = useState();

  const { title, desc, availableCopies, url, author, language, isFavourite } =
    bookDetails || {};
  console.log("isFavourits is =--> ", isFavourite);

  useEffect(() => {
    dispatch(
      getBookDetails(state?.id, (isSuccess, result) => {
        console.log("RRRRR =--> ", result);

        setBookDetails(result);
      })
    );
  }, [dispatch, state?.id]);

  const onFavBook = useCallback(() => {
    dispatch(
      BookFavourite(
        { bookId: state?.id },
        (isSuccess, result, message) => {
          console.log("FAV =--> ", result);
          if (isSuccess) {
            ToastSuccess(message);
            setBookDetails(result);
          } else {
            ToastError(message);
          }
          // isSuccess && setBookDetails(result);
        }
        //   (isSuccess) => {
        //   isSuccess &&
        //     setBookDetails((pre) => ({ ...pre, isFavourits: !pre.isFavourits }));
        // }
      )
    );
  }, [dispatch, state?.id]);

  const onEditBook = useCallback(() => {
    navigate(RouteConstants.UPDATE_BOOK_PAGE, {
      state: { bookData: bookDetails },
    });
  }, [bookDetails, navigate]);

  const onRequestBook = useCallback(() => {
    const payload = {
      bookId: bookDetails?._id,
    };
    dispatch(
      RequestBook(payload, (isSuccess, message) => {
        if (isSuccess) {
          ToastSuccess(message);
          dispatch(
            getBookDetails(state?.id, (isSuccess, result) => {
              console.log("RRRRR =--> ", result);

              setBookDetails(result);
            })
          );
        }
      })
    );
  }, [bookDetails?._id, dispatch, state?.id]);

  return (
    <div className="container-fluid ">
      <div className="row bg-danger">
        <div className="col-4 bg-dark">
          <div className="d-flex align-items-center justify-content-center m-2">
            <img src={url} alt={title} className="img-thumbnail" />
          </div>
          <div className="d-flex align-items-center justify-content-between my-3">
            {!isAdmin && (
              <div style={{ flex: 1 }}>
                {bookDetails?.status === BookRequestEnum.NotRequested ||
                bookDetails?.status === BookRequestEnum.Cancel ||
                bookDetails?.status === BookRequestEnum.Return ? (
                  <div style={{ flex: 1 }}>
                    {availableCopies > 0 ? (
                      <button
                        onClick={onRequestBook}
                        title={"Request for book"}
                        className="rounded py-2 w-50 h-10 text-black"
                        style={{ backgroundColor: "Highlight" }}
                      >
                        Request for book
                      </button>
                    ) : (
                      <h5 className="text-danger ">Out of stock</h5>
                    )}
                  </div>
                ) : (
                  <div className="d-flex align-items-center ">
                    <h5 style={{ color: "white", margin: 0 }}>
                      Book status :{" "}
                    </h5>
                    <Tag
                      className="ms-2"
                      color={"orange"}
                      key={bookDetails?.status}
                    >
                      {bookDetails?.statusName}
                    </Tag>
                  </div>
                )}
              </div>
            )}
            {isAdmin ? (
              <div className="d-flex justify-content-end gap-4 mt-2 w-100">
                <button
                  onClick={onEditBook}
                  title="Edit Book"
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    alignSelf: "flex-end",
                  }}
                  className="justify-content-center align-items-center "
                >
                  <TbEdit style={{ height: 30, width: 30 }} />
                </button>
                <button
                  onClick={showModal}
                  title="Edit Book"
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    alignSelf: "flex-end",
                  }}
                  className="justify-content-center align-items-center "
                >
                  <MdDelete style={{ height: 30, width: 30 }} />
                </button>
              </div>
            ) : (
              <button
                onClick={onFavBook}
                title="Request for book"
                style={{ height: 50, width: 50, borderRadius: 25 }}
                className="justify-content-center align-items-center"
              >
                {isFavourite ? (
                  <MdFavorite style={{ height: 30, width: 30 }} />
                ) : (
                  <MdFavoriteBorder style={{ height: 30, width: 30 }} />
                )}
              </button>
            )}
          </div>
        </div>
        <div className="col-8 p-3" style={{ backgroundColor: "#967f69" }}>
          <div>
            <h2>{title}</h2>
            <p className="fs-6 mb-4">{desc}</p>
            <p className="fs-6 mb-4">Available Copies : {availableCopies}</p>
            <p className="fs-6 mb-4">Author Name : {author}</p>
            <p className="fs-6 mb-4">Launguage : {language}</p>
          </div>
        </div>
      </div>
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
    // <div className="h-100vh w-100vw container  row justify-content-center aline-items-center ">
    //   <div className="col-4 bg-dark">
    //     <div className="p-5">
    //       <img
    //         src={url}
    //         alt={title}
    //         style={{ minHeight: 300, minWidth: 200 }}
    //         className="img-fluid"
    //       />
    //       <div className="d-flex justify-content-between mt-2">
    //         {!isAdmin && (
    //           <button
    //             title="Request for book"
    //             className="rounded py-2 w-50 h-10 text-black"
    //             style={{ backgroundColor: "Highlight" }}
    //           >
    //             Request for book
    //           </button>
    //         )}
    //         {isAdmin ? (
    //           <div className="d-flex justify-content-between mt-2">
    //             <button
    //               onClick={onEditBook}
    //               title="Edit Book"
    //               style={{
    //                 height: 50,
    //                 width: 50,
    //                 borderRadius: 25,
    //                 alignSelf: "flex-end",
    //               }}
    //               className="justify-content-center align-items-center "
    //             >
    //               <TbEdit style={{ height: 30, width: 30 }} />
    //             </button>
    //             <button
    //               onClick={showModal}
    //               title="Edit Book"
    //               style={{
    //                 height: 50,
    //                 width: 50,
    //                 borderRadius: 25,
    //                 alignSelf: "flex-end",
    //               }}
    //               className="justify-content-center align-items-center "
    //             >
    //               <MdDelete style={{ height: 30, width: 30 }} />
    //             </button>
    //           </div>
    //         ) : (
    //           <button
    //             onClick={onFavBook}
    //             title="Request for book"
    //             style={{ height: 50, width: 50, borderRadius: 25 }}
    //             className="justify-content-between align-items-center"
    //           >
    //             {isFavourite ? (
    //               <MdFavorite style={{ height: 30, width: 30 }} />
    //             ) : (
    //               <MdFavoriteBorder style={{ height: 30, width: 30 }} />
    //             )}
    //           </button>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    //   <div className="col-8" style={{ backgroundColor: "gray" }}>
    //     <ul>
    //       <div className="row d-inline-flex">
    //         <h3>
    //           Book Name: <p>{title}</p>
    //         </h3>
    //         <p className="fw-semibold fs-5">By: {author}</p>
    //         <p className="fw-semibold fs-5">Available Copies: {copies}</p>
    //         <p>Language: {language}</p>
    //         <p>Description: {desc}</p>
    //       </div>
    //     </ul>
    //   </div>
    //   <Modal
    //     title="Delete Book"
    //     okText="Delete"
    //     okButtonProps={{ danger: true }}
    //     open={isModalOpen}
    //     onOk={handleOk}
    //     onCancel={handleCancel}
    //   >
    //     <p>Are you sure you want to delete this book?</p>
    //   </Modal>
    // </div>
  );
};

export default BookDetails;

// {/* <div class=" bg-zinc-600 flex rounded p-10">
//   <div className="bg-zinc-400 p-3 rounded w-1/4">
//     <img src={url} alt={title} className="w-full" />
//     <div className="mt-2 flex w-full items-center justify-between">
//       <button
//         title="Request for book"
//         className="bg-zinc-300 rounded py-2 w-50 h-10 text-black "
//       >
//         Request for book
//       </button>
//       <button
//         onClick={onFavBook}
//         title="Request for book"
//         style={{ height: 50, width: 50, borderRadius: 25 }}
//         className="bg-zinc-300 justify-center items-center flex"
//       >
//         {isFavourits ? (
//           <MdFavorite style={{ height: 38, width: 38 }} />
//         ) : (
//           <MdFavoriteBorder style={{ height: 38, width: 38 }} />
//         )}
//       </button>
//     </div>
//   </div>
//   <div className="ms-5  justify-center ">
//     <p style={{ color: "white", fontSize: 40 }}>{title}</p>
//     <p className="mt-2" style={{ color: "white", fontSize: 20 }}>
//       {desc}
//     </p>
//     <p className="mt-2" style={{ color: "white", fontSize: 20 }}>
//       Available Copies : {copies}
//     </p>
//     <p className="mt-2" style={{ color: "white", fontSize: 20 }}>
//       Author name : {author}
//     </p>
//     <p className="mt-2" style={{ color: "white", fontSize: 20 }}>
//       language : {language}
//     </p>
//   </div>

//   {/* <p className="h-80">234234234</p> */}
// </div> */}
