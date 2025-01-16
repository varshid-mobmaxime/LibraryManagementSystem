import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import NavigationRoutes from "./route/NavigationRoutes";
import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader";

const App = () => {
  return (
    <Router>
      <div className="page-section d-flex flex-column">
        <NavBar />
        <ToastContainer />
        <div className="flex-grow-1">
          <NavigationRoutes />
          <Loader />
        </div>
      </div>
    </Router>
  );
};
// const App = () => {
//   return (
//     <Router>
//       <div className="page-section d-flex flex-column">
//         <NavBar />
//         <ToastContainer />
//         <div className="flex-grow-1">
//           <NavigationRoutes />
//           <Loader />
//         </div>
//       </div>
//     </Router>
//   );
// };

export default App;
