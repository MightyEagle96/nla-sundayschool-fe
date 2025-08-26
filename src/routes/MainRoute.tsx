import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AccountNotificationPage from "../pages/AccountNotificationPage";
import NavbarComponent from "../components/NavbarComponent";
import LoadingPage from "../components/LoadingPage";
import { useAuth } from "./useAuth";
import DashboardPage from "../pages/private/DashboardPage";
import { ProtectedRoute } from "./ProtectedRoute";

function MainRoute() {
  const { appUser } = useAuth();
  const publicRoutes = [
    { path: "/", component: <LoginPage /> },
    { path: "/register", component: <RegisterPage /> },
    { path: "/accountnotification", component: <AccountNotificationPage /> },
    { path: "/loading", component: <LoadingPage /> },
  ];

  const privateRoutes = [{ path: "/", component: <DashboardPage /> }];
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        {!appUser ? (
          <>
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
            ))}
          </>
        ) : (
          <>
            {privateRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<ProtectedRoute>{route.component}</ProtectedRoute>}
              />
            ))}
          </>
        )}

        <Route path="*" element={<LoadingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoute;
