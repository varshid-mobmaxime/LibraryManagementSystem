import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Tag } from "antd";
import { useLocation } from "react-router-dom";
import { AppRoleEnum } from "../../constants/appConstant";
import "./viewProfile.css";

const ViewProfile = () => {
  const { userData } = useSelector((state) => state.auth);
  const { state } = useLocation();
  const { userInfo } = state || {};

  let value = 20;
  var A = 10;
  const B = 5;

  const Multiply = (A, B) => {
    var newValue;
    let Parth;

    value = A * B;
    newValue = A + B + A;
    Parth = A - B;
    console.log("Value is => ", value);
    console.log("newValue is => ", newValue);
    console.log("Parth is => ", Parth);

    return value;
  };

  Multiply(A, B);

  console.log("Outof function Value is => ", value);
  // console.log("Outof function newValue is => ", newValue);
  // console.log("Outof function Parth is => ", Parth);

  console.log();

  const [userDetails, setUserDetails] = useState();

  console.log("userDetails is =--> ", userDetails);

  useEffect(() => {
    setUserDetails(userInfo || userData);
    // dispatch(
    //   getUserDetails(userId, (isSuccess, userData) => {
    //     console.log("Set user dtaa is =--> ", userData);
    //     isSuccess && setUserDetails(userData);
    //   })
    // );
  }, [userData, userInfo]);

  return (
    <div className="container mt-5">
      <div className="profile-card shadow-lg p-4 rounded">
        <div className="text-center">
          <div className="profile-pic-container">
            <img
              src={userDetails?.avatar}
              alt="Profile Pic"
              className="profile-pic rounded-circle"
            />
            <div className="hover-edit">
              <p>Edit</p>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <h3 className="mt-3 ">
              {`${userDetails?.firstName} ${userDetails?.lastName}`}
            </h3>
            <Tag
              className="ms-2"
              color={userDetails?.role === AppRoleEnum.Admin ? "red" : "blue"}
              key={userDetails?.role}
            >
              {userDetails?.role.toUpperCase()}
            </Tag>
          </div>
          <p className="text-muted">@{userDetails?.userName}</p>
        </div>
        <div className="mt-4">
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                value={userDetails?.firstName}
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                value={userDetails?.lastName}
                readOnly
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-12">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={userDetails?.userName}
                readOnly
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                value={userDetails?.phoneNumber}
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={userDetails?.email}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
