import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastWarning } from "../../constants/toastConstant";
import { SignInRequest } from "../../redux/actions/AuthActions";
import { Navigate, useNavigate } from "react-router-dom";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("varshid@yopmail.com");
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
          navigate("/", { replace: true });
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
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center w-full">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Sign In</p>
        <div className="mt-10">
          <label htmlFor="" className="text-zinc-400 ">
            Email :
          </label>
          <input
            onChange={onEmailChange}
            type="email"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="email"
            name="Email"
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Password :
          </label>
          <input
            onChange={onPasswordChange}
            type="password"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="password"
            name="Password"
            required
          />
        </div>
        <button
          onClick={onSignIn}
          className="w-full bg-blue-400 mt-5 text-white font-semibold rounded hover:text-zinc-700 py-2 hover:bg-white"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Signin;
