import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Tag } from "antd";
import { AppRoleEnum } from "../../constants/appConstant";
import { updateUserDetails } from "../../redux/actions/UserActions";

const EditProfile = () => {
  const { state } = useLocation();
  const { userInfo } = state || {};

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    firstName: userInfo?.firstName,
    lastName: userInfo?.lastName,
    userName: userInfo?.userName,
    phoneNumber: userInfo?.phoneNumber,
    email: userInfo?.email,
    profileURL: userInfo?.avatar,
    role: userInfo?.role === "admin",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .required("Last name is required"),
    userName: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    profileURL: Yup.string()
      .url("Invalid URL format")
      .required("Profile URL is required"),
  });

  const handleSubmit = (values) => {
    const payload = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      userName: values?.userName,
      phoneNumber: values?.phoneNumber,
      email: values?.email,
      avatar: values?.profileURL,
      role: values?.role ? "admin" : "user",
    };
    console.log("payload is =--> ", payload);
    dispatch(
      updateUserDetails(userInfo?._id, payload, (isSuccess) => {
        isSuccess && navigate(-1);
      })
    );
    // console.log("Form values:", values);
  };

  return (
    <div className="container my-5">
      <div className="edit-profile-card shadow-lg p-4 rounded">
        <h3 className="text-center mb-4">Edit Profile</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <Field
                  type="text"
                  name="firstName"
                  className="form-control"
                  placeholder="Enter first name"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <Field
                  type="text"
                  name="lastName"
                  className="form-control"
                  placeholder="Enter last name"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <Field
                  type="text"
                  name="userName"
                  className="form-control"
                  placeholder="Enter username"
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <Field
                  type="text"
                  name="phoneNumber"
                  className="form-control"
                  placeholder="Enter phone number"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email address"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Profile URL</label>
                <Field
                  type="text"
                  name="profileURL"
                  className="form-control"
                  placeholder="Enter profile picture URL"
                />
                <ErrorMessage
                  name="profileURL"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="form-label d-block">Role</label>
                <div className="form-switch">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="roleSwitch"
                    checked={values.role}
                    onChange={(e) => setFieldValue("role", e.target.checked)}
                  />
                  <Tag
                    className="ms-2"
                    color={
                      (values.role ? "admin" : "user") === AppRoleEnum.Admin
                        ? "red"
                        : "blue"
                    }
                    key={values.role}
                  >
                    {(values.role ? "admin" : "user").toUpperCase()}
                  </Tag>
                  {/* <label htmlFor="roleSwitch" className="ms-2">
                    {values.role ? "Admin" : "User"}
                  </label> */}
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary px-4 rounded-pill shadow-sm"
                >
                  Update Changes
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProfile;
