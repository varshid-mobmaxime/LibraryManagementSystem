import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastWarning } from "../../constants/toastConstant";
import { SignInRequest } from "../../redux/actions/AuthActions";
import { ChangePasswordRequest } from "../../redux/actions/ProfileActions";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prevState) => !prevState);
  };

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword((prevState) => !prevState);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onNewPasswordChange = useCallback((event) => {
    setNewPassword(event.target.value);
  }, []);

  const onOldPasswordChange = useCallback((event) => {
    setOldPassword(event.target.value);
  }, []);

  const onChangePassword = useCallback(() => {
    if (!oldPassword) {
      ToastWarning("Old Password can not be blank.");
      return;
    }

    if (oldPassword.length < 6) {
      ToastWarning("Old password must be more then 6 char.");
      return;
    }

    if (!newPassword) {
      ToastWarning("New Password can not be blank.");
      return;
    }

    if (newPassword.length < 6) {
      ToastWarning("New password must be more then 6 char.");
      return;
    }

    let payload = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    dispatch(
      ChangePasswordRequest(payload, (isSuccess) => {
        if (isSuccess) {
          navigate(-1);
        }
      })
    );
  }, [dispatch, navigate, newPassword, oldPassword]);

  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center w-full">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Change Password</p>

        <div className="mt-4">
          <label htmlFor="newPassword" className="text-zinc-400">
            Old Password:
          </label>
          <div className="relative w-full mt-2">
            {/* Input field */}
            <input
              id="oldPassword"
              onChange={onOldPasswordChange}
              value={oldPassword}
              type={showOldPassword ? "text" : "password"}
              className="w-full bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Old password"
              name="Password"
              required
            />

            {/* Eye icon */}
            <span
              onClick={toggleOldPasswordVisibility}
              className="absolute right-2 top-2 text-zinc-400 cursor-pointer"
            >
              {showOldPassword ? "🐵" : "🙈"}
              {/* Replace these with actual icons from a library if needed */}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="newPassword" className="text-zinc-400">
            New Password:
          </label>
          <div className="relative w-full mt-2">
            {/* Input field */}
            <input
              id="newPassword"
              onChange={onNewPasswordChange}
              value={newPassword}
              type={showNewPassword ? "text" : "password"}
              className="w-full bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="New password"
              name="Password"
              required
            />

            {/* Eye icon */}
            <span
              onClick={toggleNewPasswordVisibility}
              className="absolute right-2 top-2 text-zinc-400 cursor-pointer"
            >
              {showNewPassword ? "🐵" : "🙈"}
              {/* Replace these with actual icons from a library if needed */}
            </span>
          </div>
        </div>

        <button
          onClick={onChangePassword}
          className="w-full bg-blue-400 mt-5 text-white font-semibold rounded hover:text-zinc-700 py-2 hover:bg-white"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
