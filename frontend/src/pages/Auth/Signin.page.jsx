import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastWarning } from "../../constants/toastConstant";
import { SignInRequest } from "../../redux/actions/AuthActions";
import { Navigate, useNavigate } from "react-router-dom";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [email, setEmail] = useState("hardik@yopmail.com");
  // const [password, setPassword] = useState("Hardik@123");
  // const [email, setEmail] = useState("varshid@yopmail.com");
  // const [password, setPassword] = useState("Varshid@123");
  // const [email, setEmail] = useState("himu@yopmail.com");
  // const [password, setPassword] = useState("Himu@123");
  const [email, setEmail] = useState("varshidd@yopmail.com");
  const [password, setPassword] = useState("Varshid@123");

  const onSignIn = useCallback(() => {
    if (!email) {
      ToastWarning("Email can not be blank.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      ToastWarning("Email is not valid.");
      return;
    }

    if (!password) {
      ToastWarning("Password can not be blank.");
      return;
    }

    if (password.length < 6) {
      ToastWarning("Password must be more then 6 char.");
      return;
    }

    let payload = {
      email: email,
      password: password,
    };

    dispatch(
      SignInRequest(payload, (isSuccess) => {
        if (isSuccess) {
          navigate("/books", { replace: true });
        }
      })
    );
  }, [dispatch, email, password]);

  const onPasswordChange = useCallback((event) => {
    console.log("Txt is =--> ", event.target.value);

    setPassword(event.target.value);
  }, []);

  const onEmailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  return (
    <>
      <div className="page-section login-page d-flex align-items-center justify-content-center">
        <div className="px-5 py-3 bg-primary-custom rounded text-white login-box">
          <h2 className="text-center">Sign In</h2>
          <br />
          <div className="row align-items-center mb-3">
            <div className="col-4">Email</div>
            <div className="col-8">
              <div className="form-group">
                <input className="form-control" onChange={onEmailChange} />
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-4">Password</div>
            <div className="col-8">
              <div className="form-group">
                <input className="form-control" onChange={onPasswordChange} />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <button
                className="login-header-btn d-inline-block"
                onClick={onSignIn}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
