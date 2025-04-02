// Breadcrumb.js
import React from "react";
import { Link, useRoutes, useLocation } from "react-router-dom";

const Breadcrumbbbb = () => {
  const routes = useRoutes();
  const location = useLocation();

  // Extract breadcrumb data from the route
  //   const breadcrumbs = routes?.filter(
  //     (route) => route?.path !== "*" && route?.element.props?.breadcrumb
  //   );

  console.log("breadcrumbs Location is =--> ", location);

  return (
    <div>
      Breadcrumb
      {/* {breadcrumbs &&
        breadcrumbs?.map((breadcrumb, index) => (
          <span key={index}>
            <Link to={breadcrumb.props.to}>{breadcrumb.props.breadcrumb}</Link>
            {index < breadcrumbs.length - 1 && " / "}
          </span>
        ))} */}
    </div>
  );
};

export default Breadcrumbbbb;
