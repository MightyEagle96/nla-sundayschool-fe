import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import MainRoute from "./routes/MainRoute";
import { ToastContainer } from "react-toastify";
import { AppUserContext } from "./contexts/AppUserContext";
import { useState } from "react";
import "./App.css";

function App() {
  const [appUser, setAppUser] = useState(null);
  return (
    <>
      <AppUserContext.Provider value={{ appUser, setAppUser }}>
        <ToastContainer />
        <MainRoute />
      </AppUserContext.Provider>
    </>
  );
}

export default App;
