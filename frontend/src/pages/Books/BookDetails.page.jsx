import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { BookFavourite, getBookDetails } from "../../redux/actions/BookAction";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";

const BookDetails = () => {
  const { state } = useLocation();

  const dispatch = useDispatch();

  const [bookDetails, setBookDetails] = useState();

  const { title, desc, copies, url, author, language, isFavourits } =
    bookDetails || {};

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
        (isSuccess, result) => {
          console.log("FAV =--> ", result);

          // isSuccess && setBookDetails(result);
        }
        //   (isSuccess) => {
        //   isSuccess &&
        //     setBookDetails((pre) => ({ ...pre, isFavourits: !pre.isFavourits }));
        // }
      )
    );
  }, []);

  return (
    <div className=" bg-zinc-700 h-[100vh] w-full flex-1 p-10 ">
      <div class=" bg-zinc-600 flex rounded p-10">
        <div className="bg-zinc-400 p-3 rounded w-1/4">
          <img src={url} alt={title} className="w-full" />
          <div className="mt-2 flex w-full items-center justify-between">
            <button
              title="Request for book"
              className="bg-zinc-300 rounded py-2 w-50 h-10 text-black "
            >
              Request for book
            </button>
            <button
              onClick={onFavBook}
              title="Request for book"
              style={{ height: 50, width: 50, borderRadius: 25 }}
              className="bg-zinc-300 justify-center items-center flex"
            >
              {isFavourits ? (
                <MdFavorite style={{ height: 38, width: 38 }} />
              ) : (
                <MdFavoriteBorder style={{ height: 38, width: 38 }} />
              )}
            </button>
          </div>
        </div>
        <div className="ms-5  justify-center ">
          <p style={{ color: "white", fontSize: 40 }}>{title}</p>
          <p className="mt-2" style={{ color: "white", fontSize: 20 }}>
            {desc}
          </p>
          <p className="mt-2" style={{ color: "white", fontSize: 20 }}>
            Available Copies : {copies}
          </p>
          <p className="mt-2" style={{ color: "white", fontSize: 20 }}>
            Author name : {author}
          </p>
          <p className="mt-2" style={{ color: "white", fontSize: 20 }}>
            language : {language}
          </p>
        </div>

        {/* <p className="h-80">234234234</p> */}
      </div>
    </div>
  );
};

export default BookDetails;
