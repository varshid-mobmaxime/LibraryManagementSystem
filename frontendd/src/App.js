/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// import { Navigate, Route, Switch } from "react-router-dom";

import NavigationRoutes from "./navigation/NavigationRoutes";

// function App() {
//   return (
//     // <div className="App">
//     //   <Router>
//     //     <Routes>
//     //       <Route path="/sign-up" exact component={SignUp} />
//     //       <Route path="/sign-in" exact component={SignIn} />
//     //       <Main>
//     //         <Route exact path="/dashboard" component={Home} />
//     //         <Route exact path="/tables" component={Tables} />
//     //         <Route exact path="/rtl" component={Rtl} />
//     //         <Route exact path="/profile" component={Profile} />
//     //         <Navigate from="*" to="/dashboard" />
//     //       </Main>
//     //     </Routes>
//     //   </Router>
//     // </div>
//     <div className="App">
//       <Router>
//         <Routes>
//           {/* Authentication Routes */}
//           <Route path="/sign-up" element={<SignUp />} />
//           <Route path="/sign-in" element={<SignIn />} />
//           {/* Main Layout Routes */}
//           <Route path="/" element={<Main />}>
//             <Route path="dashboard" element={<Home />} />
//             <Route path="tables" element={<Tables />} />
//             <Route path="rtl" element={<Rtl />} />
//             <Route path="profile" element={<Profile />} />
//             {/* Redirect any unmatched paths */}
//             <Route path="*" element={<Navigate to="/dashboard" replace />} />
//           </Route>
//         </Routes>
//       </Router>
//     </div>
//   );
// }

function App() {
  return (
    <div className="App">
      <NavigationRoutes />
    </div>
  );
}

export default App;
