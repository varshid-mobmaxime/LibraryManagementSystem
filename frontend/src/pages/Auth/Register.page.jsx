import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./register.css";
import { useDispatch } from "react-redux";
import { RegisterUserRequest } from "../../redux/actions/AuthActions";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    userName: Yup.string().required("User Name is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone Number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    avatar: Yup.string().required("Avatar is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = (values) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      userName: values.userName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      password: values.password,
      avatar: values.avatar,
    };

    dispatch(
      RegisterUserRequest(payload, (isSuccess) => {
        if (isSuccess) {
          navigate("/books", { replace: true });
        }
      })
    );
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    phoneNumber: "",
    email: "",
    avatar: "",
    password: "",
    confirmPassword: "",
  };
  return (
    <div className="container-fluid gradient-bg">
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-12 col-12">
          <div className="p-4 rounded shadow m-5">
            <h3 className="text-center text-white mb-4">Register</h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  {/* First Name */}
                  <div className="mb-3">
                    <label className="form-label text-white">First Name</label>
                    <Field
                      name="firstName"
                      type="text"
                      className={`form-control ${
                        errors.firstName && touched.firstName
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="mb-3">
                    <label className="form-label text-white">Last Name</label>
                    <Field
                      name="lastName"
                      type="text"
                      className={`form-control ${
                        errors.lastName && touched.lastName ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {/* Username */}
                  <div className="mb-3">
                    <label className="form-label text-white">Username</label>
                    <Field
                      name="userName"
                      type="text"
                      className={`form-control ${
                        errors.userName && touched.userName ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="userName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="mb-3">
                    <label className="form-label text-white">
                      Phone Number
                    </label>
                    <Field
                      name="phoneNumber"
                      type="text"
                      className={`form-control ${
                        errors.phoneNumber && touched.phoneNumber
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label text-white">Email</label>
                    <Field
                      name="email"
                      type="email"
                      className={`form-control ${
                        errors.email && touched.email ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {/* Avatar */}
                  <div className="mb-3">
                    <label className="form-label text-white">Avatar</label>
                    <Field
                      name="avatar"
                      type="avatar"
                      className={`form-control ${
                        errors.avatar && touched.avatar ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="avatar"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label className="form-label text-white">Password</label>
                    <Field
                      name="password"
                      type="password"
                      className={`form-control ${
                        errors.password && touched.password ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-3">
                    <label className="form-label text-white">
                      Confirm Password
                    </label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      className={`form-control ${
                        errors.confirmPassword && touched.confirmPassword
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <button type="submit" className="btn register-btn w-100">
                      Register
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
    // <div className="container mt-5">
    //   <div className="row justify-content-center">
    //     <div className="col-md-6">
    //       <div className="card shadow border-0">
    //         <div className="card-header bg-primary text-white text-center">
    //           <h3>Register</h3>
    //         </div>
    //         <div className="card-body">
    //           <Formik
    //             initialValues={{
    //               firstName: "",
    //               lastName: "",
    //               userName: "",
    //               phoneNumber: "",
    //               email: "",
    //               password: "",
    //               confirmPassword: "",
    //             }}
    //             validationSchema={validationSchema}
    //             onSubmit={handleSubmit}
    //           >
    //             {({ errors, touched }) => (
    //               <Form>
    //                 {/* First Name */}
    //                 <div className="mb-3">
    //                   <label htmlFor="firstName" className="form-label">
    //                     First Name
    //                   </label>
    //                   <Field
    //                     name="firstName"
    //                     type="text"
    //                     className={`form-control ${
    //                       errors.firstName && touched.firstName
    //                         ? "is-invalid"
    //                         : ""
    //                     }`}
    //                   />
    //                   <ErrorMessage
    //                     name="firstName"
    //                     component="div"
    //                     className="invalid-feedback"
    //                   />
    //                 </div>

    //                 {/* Last Name */}
    //                 <div className="mb-3">
    //                   <label htmlFor="lastName" className="form-label">
    //                     Last Name
    //                   </label>
    //                   <Field
    //                     name="lastName"
    //                     type="text"
    //                     className={`form-control ${
    //                       errors.lastName && touched.lastName
    //                         ? "is-invalid"
    //                         : ""
    //                     }`}
    //                   />
    //                   <ErrorMessage
    //                     name="lastName"
    //                     component="div"
    //                     className="invalid-feedback"
    //                   />
    //                 </div>

    //                 {/* User Name */}
    //                 <div className="mb-3">
    //                   <label htmlFor="userName" className="form-label">
    //                     User Name
    //                   </label>
    //                   <Field
    //                     name="userName"
    //                     type="text"
    //                     className={`form-control ${
    //                       errors.userName && touched.userName
    //                         ? "is-invalid"
    //                         : ""
    //                     }`}
    //                   />
    //                   <ErrorMessage
    //                     name="userName"
    //                     component="div"
    //                     className="invalid-feedback"
    //                   />
    //                 </div>

    //                 {/* Phone Number */}
    //                 <div className="mb-3">
    //                   <label htmlFor="phoneNumber" className="form-label">
    //                     Phone Number
    //                   </label>
    //                   <Field
    //                     name="phoneNumber"
    //                     type="text"
    //                     className={`form-control ${
    //                       errors.phoneNumber && touched.phoneNumber
    //                         ? "is-invalid"
    //                         : ""
    //                     }`}
    //                   />
    //                   <ErrorMessage
    //                     name="phoneNumber"
    //                     component="div"
    //                     className="invalid-feedback"
    //                   />
    //                 </div>

    //                 {/* Email */}
    //                 <div className="mb-3">
    //                   <label htmlFor="email" className="form-label">
    //                     Email
    //                   </label>
    //                   <Field
    //                     name="email"
    //                     type="email"
    //                     className={`form-control ${
    //                       errors.email && touched.email ? "is-invalid" : ""
    //                     }`}
    //                   />
    //                   <ErrorMessage
    //                     name="email"
    //                     component="div"
    //                     className="invalid-feedback"
    //                   />
    //                 </div>

    //                 {/* Password */}
    //                 <div className="mb-3">
    //                   <label htmlFor="password" className="form-label">
    //                     Password
    //                   </label>
    //                   <Field
    //                     name="password"
    //                     type="password"
    //                     className={`form-control ${
    //                       errors.password && touched.password
    //                         ? "is-invalid"
    //                         : ""
    //                     }`}
    //                   />
    //                   <ErrorMessage
    //                     name="password"
    //                     component="div"
    //                     className="invalid-feedback"
    //                   />
    //                 </div>

    //                 {/* Confirm Password */}
    //                 <div className="mb-3">
    //                   <label htmlFor="confirmPassword" className="form-label">
    //                     Confirm Password
    //                   </label>
    //                   <Field
    //                     name="confirmPassword"
    //                     type="password"
    //                     className={`form-control ${
    //                       errors.confirmPassword && touched.confirmPassword
    //                         ? "is-invalid"
    //                         : ""
    //                     }`}
    //                   />
    //                   <ErrorMessage
    //                     name="confirmPassword"
    //                     component="div"
    //                     className="invalid-feedback"
    //                   />
    //                 </div>

    //                 {/* Submit Button */}
    //                 <div className="d-grid">
    //                   <button type="submit" className="btn btn-primary">
    //                     Register
    //                   </button>
    //                 </div>
    //               </Form>
    //             )}
    //           </Formik>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

// <div className="h-auto bg-zinc-900 px-15 py-8 flex items-center justify-center w-full overflow-scroll ">
//   <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6 mt-60">
//     <p className="text-zinc-200 text-xl">Register User</p>
//     <div className="mt-10">
//       <label htmlFor="" className="text-zinc-400 ">
//         First Name :
//       </label>
//       <input
//         type="text"
//         className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
//         placeholder="first name"
//         name="firstName"
//         required
//       />
//     </div>

//     <div className="mt-4">
//       <label htmlFor="" className="text-zinc-400 ">
//         Last Name :
//       </label>
//       <input
//         type="text"
//         className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
//         placeholder="last name"
//         name="lastName"
//         required
//       />
//     </div>

//     <div className="mt-4">
//       <label htmlFor="" className="text-zinc-400 ">
//         UserName :
//       </label>
//       <input
//         type="text"
//         className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
//         placeholder="username"
//         name="userName"
//         required
//       />
//     </div>

//     <div className="mt-4">
//       <label htmlFor="" className="text-zinc-400 ">
//         Email :
//       </label>
//       <input
//         type="email"
//         className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
//         placeholder="email"
//         name="Email"
//         required
//       />
//     </div>

//     <div className="mt-4">
//       <label htmlFor="" className="text-zinc-400">
//         Password :
//       </label>
//       <input
//         type="password"
//         className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
//         placeholder="password"
//         name="Password"
//         required
//       />
//     </div>

//     <div className="mt-4">
//       <label htmlFor="" className="text-zinc-400">
//         Confirm Password :
//       </label>
//       <input
//         type="password"
//         className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
//         placeholder="confirm password"
//         name="ConfirmPassword"
//         required
//       />
//     </div>
//     <button className="w-full bg-blue-400 mt-5 text-white font-semibold rounded hover:text-zinc-700 py-2 hover:bg-white">
//       Register
//     </button>
//   </div>
// </div>
export default Register;
