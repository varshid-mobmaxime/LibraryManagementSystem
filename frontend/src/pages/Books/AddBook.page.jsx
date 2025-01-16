import React, { useCallback } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import validationSchema from "../../Services/validationServices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddBookRequest } from "../../redux/actions/BookAction";
import { ToastSuccess } from "../../constants/toastConstant";

const AddBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddBook = useCallback(
    (values, { resetForm }) => {
      console.log("Form values:", values);
      const { author, bookUrl, copies, desc, language, title } = values || {};
      const payload = {
        url: bookUrl,
        title: title,
        desc: desc,
        copies: copies,
        author: author,
        language: language,
      };
      dispatch(
        AddBookRequest(payload, (isSuccess, message) => {
          isSuccess && ToastSuccess(message);
          isSuccess && resetForm();
        })
      );
    },
    [dispatch]
  );

  const initialValue = {
    bookUrl: "",
    title: "",
    desc: "",
    copies: 0,
    author: "",
    language: "",
  };
  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validationSchema.AddBookSchema}
      onSubmit={onAddBook}
    >
      {({ errors, touched, values, isSubmitting }) => (
        <Form>
          <h2 className="mb-4">Add New Book</h2>

          {/* Title Field */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <Field
              type="text"
              className={`form-control ${
                touched.title && errors.title ? "is-invalid" : ""
              }`}
              id="title"
              name="title"
              placeholder="Enter the book title"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="invalid-feedback"
            />
          </div>

          {/* Description Field */}
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">
              Description
            </label>
            <Field
              as="textarea"
              className={`form-control ${
                touched.desc && errors.desc ? "is-invalid" : ""
              }`}
              id="desc"
              name="desc"
              rows="3"
              placeholder="Enter a short description of the book"
            />
            <ErrorMessage
              name="desc"
              component="div"
              className="invalid-feedback"
            />
          </div>

          {/* Book URL Field */}
          <div className="mb-3">
            <label htmlFor="bookUrl" className="form-label">
              Book URL
            </label>
            <Field
              type="url"
              className={`form-control ${
                touched.bookUrl && errors.bookUrl ? "is-invalid" : ""
              }`}
              id="bookUrl"
              name="bookUrl"
              placeholder="Enter the book URL"
            />
            <ErrorMessage
              name="bookUrl"
              component="div"
              className="invalid-feedback"
            />
          </div>

          {/* Copies Field */}
          <div className="mb-3">
            <label htmlFor="copies" className="form-label">
              Copies
            </label>
            <Field
              type="number"
              className={`form-control ${
                touched.copies && errors.copies ? "is-invalid" : ""
              }`}
              id="copies"
              name="copies"
              placeholder="Enter the number of copies"
            />
            <ErrorMessage
              name="copies"
              component="div"
              className="invalid-feedback"
            />
          </div>

          {/* Author Field */}
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Author
            </label>
            <Field
              type="text"
              className={`form-control ${
                touched.author && errors.author ? "is-invalid" : ""
              }`}
              id="author"
              name="author"
              placeholder="Enter the author's name"
            />
            <ErrorMessage
              name="author"
              component="div"
              className="invalid-feedback"
            />
          </div>

          {/* Language Field */}
          <div className="mb-3">
            <label htmlFor="language" className="form-label">
              Language
            </label>
            <Field
              type="text"
              className={`form-control ${
                touched.language && errors.language ? "is-invalid" : ""
              }`}
              id="language"
              name="language"
              placeholder="Enter the language"
            />
            <ErrorMessage
              name="language"
              component="div"
              className="invalid-feedback"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="login-header-btn"
            disabled={isSubmitting}
          >
            Add Book
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddBook;
