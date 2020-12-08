import React from "react";
import Axios from "axios";
import Login from "./components/Login";
import Error429 from "./components/Errors/Error429";
import Loading from "./components/Errors/Loading";

const ProtectedRoutes = (component) => {
  const [data, setData] = React.useState("");
  const [error, setError] = React.useState({ data: "", status: "" });

  React.useEffect(() => {
    const localToken = localStorage.getItem("auth-token");
    const sessionToken = sessionStorage.getItem("auth-token");

    Axios.get("http://localhost:5000/auth/isLoggedIn", {
      headers: { localToken, sessionToken },
    })
      .then((res) => setData(res.data))
      .catch((err) => setError({ data: err, status: err.response.status }));
  }, []);

  if (data.isLoggedIn === true) {
    return component;
  } else if (data.isLoggedIn === false || data.isTokenOk === false) {
    return Login;
  } else if (error.status === 429) {
    return Error429;
  } else {
    return Loading;
  }
};

export default ProtectedRoutes;
