import React from "react";
import Axios from "axios";
import Login from "./components/Login";
import Loading from "./components/Errors/Loading";

const ProtectedRoutes = (component) => {
  const [data, setData] = React.useState("");

  React.useEffect(() => {
    const localToken = localStorage.getItem("auth-token");
    const sessionToken = sessionStorage.getItem("auth-token");

    Axios.get("http://localhost:5000/auth/isLoggedIn", {
      headers: { localToken, sessionToken },
    }).then((res) => setData(res.data));
  }, []);

  if (data.isLoggedIn === true) {
    return component;
  } else if (data.isLoggedIn === false || data.isTokenOk === false) {
    return Login;
  } else {
    return Loading;
  }
};

export default ProtectedRoutes;
