import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AccountNotificationPage from "../pages/AccountNotificationPage";
import NavbarComponent from "../components/NavbarComponent";

function MainRoute() {
  const publicRoutes = [
    { path: "/", component: <LoginPage /> },
    { path: "/register", component: <RegisterPage /> },
    { path: "/accountnotification", component: <AccountNotificationPage /> },
  ];
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
        {/* <Route path="/" element={<App />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoute;
