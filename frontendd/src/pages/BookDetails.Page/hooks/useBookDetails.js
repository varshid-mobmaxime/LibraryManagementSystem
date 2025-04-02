import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastError, ToastSuccess } from "../../../constants/toastConstant";
import {
  AddBookRating,
  BookFavourite,
  DeleteBookRequest,
  getBookDetails,
  RequestBook,
} from "../../../redux/actions/BookAction";

const useBookDetails = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin } = useSelector((state) => state.auth);
  const { buttonColor } = useSelector((state) => state.theme);

  const [rate, setRate] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookDetails, setBookDetails] = useState();
  const [open, setOpen] = useState(false);

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

  const onBookRating = useCallback(
    (rating) => {
      console.log("Rating is =--> ", rating);

      let payload = {
        bookId: bookDetails?._id,
        rating: rating,
      };
      setRate(rating);
      dispatch(AddBookRating(payload));
    },
    [bookDetails?._id, dispatch]
  );

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  console.log("isAdmin is =--> ", isAdmin);

  const showAddBookDrawer = () => {
    setOpen(true);
  };
  const onCloseAddBookDrawer = () => {
    dispatch(
      getBookDetails(state?.id, (isSuccess, result) => {
        setBookDetails(result);
      })
    );
    setOpen(false);
  };

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

  useEffect(() => {
    dispatch(
      getBookDetails(state?.id, (isSuccess, result) => {
        setBookDetails(result);
      })
    );
  }, [dispatch, state?.id]);

  useEffect(() => {
    if (bookDetails?.rating) {
      setRate(bookDetails.rating?.userRating);
    }
  }, [bookDetails?.rating]);

  return {
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
  };
};

export default useBookDetails;
