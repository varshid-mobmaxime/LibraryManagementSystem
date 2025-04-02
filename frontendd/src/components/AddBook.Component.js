import { ErrorMessage, Field, Form, Formik } from "formik";

// import { Button, Drawer, Space } from "antd";
import { Button, Drawer, message, Space, Upload } from "antd";
import React, { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { ToastSuccess } from "../constants/toastConstant";
import { AddBookRequest, UpdateBookRequest } from "../redux/actions/BookAction";
import validationSchema from "../Services/validationServices";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const AddBook = ({ onClose, isOpen, data }) => {
  const formikRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("data is =--> ", data);

  const { url, title, desc, copies, author, language } = data || {};

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
          isSuccess && ToastSuccess(message); // Show success toast
          isSuccess && resetForm(); // Reset form if successful
          isSuccess && onClose(); // Reset form if successful
        })
      );
    },
    [dispatch, onClose]
  );

  const onUpdateBook = useCallback(
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
        UpdateBookRequest(data?._id, payload, (isSuccess, message) => {
          isSuccess && ToastSuccess(message);
          isSuccess && resetForm();
          isSuccess && onClose();
        })
      );
    },
    [data?._id, dispatch, onClose]
  );

  //   const props = {
  //     name: "file",
  //     action: "http://localhost:5001/media-upload/book",
  //     listType: "picture",
  //     previewFile(file) {
  //       console.log("Your upload file:", file);
  //       // Your process logic. Here we just mock to the same file
  //       return fetch("http://localhost:5001/media-upload/book", {
  //         method: "POST",
  //         body: file,
  //       })
  //         .then((res) => res.json())
  //         .then(({ thumbnail }) => thumbnail);
  //     },
  //     // onChange(info) {
  //     //   if (info.file.status !== "uploading") {
  //     //     console.log(info.file, info.fileList);
  //     //   }
  //     //   if (info.file.status === "done") {
  //     //     message.success(`${info.file.name} file uploaded successfully`);
  //     //   } else if (info.file.status === "error") {
  //     //     message.error(`${info.file.name} file upload failed.`);
  //     //   }
  //     // },
  //   };

  const props = {
    action: "http://localhost:5001/media-upload/book",
    listType: "picture",
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    beforeUpload(file) {
      // Validate file type (only accept image files)
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
        return false;
      }

      // Validate file size (5MB max)
      const isSmallEnough = file.size / 1024 / 1024 < 5; // 5MB
      if (!isSmallEnough) {
        message.error("Image must be smaller than 5MB!");
        return false;
      }

      return true; // Allow the file to upload if all validations pass
    },
    // beforeUpload(file) {
    //   return new Promise((resolve) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //       const img = document.createElement("img");
    //       img.src = reader.result;
    //       img.onload = () => {
    //         const canvas = document.createElement("canvas");
    //         canvas.width = img.naturalWidth;
    //         canvas.height = img.naturalHeight;
    //         const ctx = canvas.getContext("2d");
    //         ctx.drawImage(img, 0, 0);
    //         ctx.fillStyle = "red";
    //         ctx.textBaseline = "middle";
    //         ctx.font = "33px Arial";
    //         ctx.fillText("Ant Design", 20, 20);
    //         canvas.toBlob((result) => resolve(result));
    //       };
    //     };
    //   });
    // },
  };

  const initialValue = {
    bookUrl: url || "",
    title: title || "",
    desc: desc || "",
    copies: copies || 0,
    author: author || "",
    language: language || "",
  };
  return (
    <Drawer
      title="Add New Book"
      width={720}
      onClose={() => {
        formikRef.current?.resetForm();
        onClose();
      }}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      open={isOpen}
    >
      <Formik
        innerRef={formikRef}
        initialValues={initialValue}
        validationSchema={validationSchema.AddBookSchema}
        onSubmit={data ? onUpdateBook : onAddBook}
        //   onSubmit={onAddBook} // This handles form submission
      >
        {({
          errors,
          touched,
          values,
          isSubmitting,
          setFieldValue,
          handleSubmit,
          resetForm,
        }) => (
          <Form id="addBookForm">
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
              <br />
              {/* <Upload
                className={`form-control ${
                  touched.bookUrl && errors.bookUrl ? "is-invalid" : ""
                }`}
                showUploadList={{
                  showRemoveIcon: true, // Ensure the remove icon is shown
                  removeIcon: <DeleteOutlined />, // You can replace this with a custom icon (e.g., SVG or Ant Design Icon)
                }}
                onRemove={(file) => {
                  console.log(`File ${file.name} removed.`);
                  // Here you can handle the removal of the file.
                  // If you want to clear the URL or take other actions:
                  setFieldValue("bookUrl", ""); // Clear the URL field or any other necessary logic
                  message.success(`${file.name} removed successfully.`);
                }}
                action={"http://localhost:5001/media-upload/book"}
                multiple={false}
                maxCount={1}
                listType="picture"
                onChange={(info) => {
                  console.log("info is =--> ", info);

                  if (info.file.status !== "uploading") {
                    console.log(info.file, info.fileList);
                  }
                  if (info.file.status === "done") {
                    message.success(
                      `${info.file.name} file uploaded successfully`
                    );
                    info.file?.response?.success &&
                      setFieldValue("bookUrl", info.file?.response?.url);
                  } else if (info.file.status === "error") {
                    message.error(`${info.file.name} file upload failed.`);
                  }
                }}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload> */}
              <Field
                type="text"
                className={`form-control ${
                  touched.bookUrl && errors.bookUrl ? "is-invalid" : ""
                }`}
                id="bookUrl"
                name="bookUrl"
                placeholder="Enter the bookUrl"
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
              <div className="d-flex align-items-center gap-2 mt-2">
                <Button onClick={resetForm} color="danger" variant="solid">
                  Reset Form
                </Button>
                <Button
                  variant="solid"
                  color="cyan"
                  htmlType="submit"
                  form="addBookForm"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  {data ? "Update Book" : "Add Book"}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {/* <Form
          form={form}
          id="addBookForm"
          layout="vertical"
          onFinish={handleFinish}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="uri"
                label="Book image"
                rules={[
                  {
                    required: true,
                    message: "Please upload a book cover image",
                  },
                ]}
              >
                <Upload
                  name="file"
                  listType="picture"
                  maxCount={1}
                  beforeUpload={() => false} // Prevent automatic upload
                >
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: "Please enter the book title",
                  },
                ]}
              >
                <Input placeholder="Enter book title" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="desc"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please enter a brief description",
                  },
                ]}
              >
                <Input.TextArea rows={3} placeholder="Enter book description" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="copies"
                label="Number of Copies"
                rules={[
                  {
                    required: true,
                    message: "Please enter the number of copies available",
                  },
                ]}
              >
                <InputNumber
                  min={1}
                  placeholder="Enter number of copies"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="author"
                label="Author"
                rules={[
                  {
                    required: true,
                    message: "Please enter the author's name",
                  },
                ]}
              >
                <Input placeholder="Enter author name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="language"
                label="Language"
                rules={[
                  {
                    required: true,
                    message: "Please select the book's language",
                  },
                ]}
              >
                <Select placeholder="Select book language">
                  <Option value="english">English</Option>
                  <Option value="spanish">Spanish</Option>
                  <Option value="french">French</Option>
                  <Option value="german">German</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form> */}
    </Drawer>
  );
};

export default AddBook;
