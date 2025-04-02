import React, { createRef, useImperativeHandle, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
export const loaderRef = createRef();

const Loader = () => {
  const [isVisible, setIsVisible] = useState(false);
  useImperativeHandle(
    loaderRef,
    () => ({
      show: () => {
        setIsVisible(true);
      },
      hide: () => {
        setIsVisible(false);
      },
    }),
    []
  );

  return isVisible ? (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00000050",
        //addition style for handle loader issue
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
          padding: 10,
        }}
      >
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#60A5FA"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  ) : null;
};

export default Loader;
