import React from "react";
import Axios from "axios";
import Login from "./components/Login";
import AdminLogin from "./components/Admin/AdminLogin";
import Error429 from "./components/Errors/Error429";
import Error400 from "./components/Errors/Error400";
import Loading from "./components/Errors/Loading";

const ProtectedRoute = (props) => {
  const [authStatus, setAuthStatus] = React.useState("");
  const [authError, setAuthError] = React.useState({ data: "", status: "" });

  const localToken = localStorage.getItem("auth-token");
  const sessionToken = sessionStorage.getItem("auth-token");

  React.useEffect(() => {
    Axios.get(
      "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/auth/isLoggedIn",
      {
        headers: { localToken, sessionToken },
      }
    )
      .then((res) => setAuthStatus(res.data))
      .catch((err) => setAuthError({ data: err, status: err.response.status }));
  }, [localToken, sessionToken]);

  if (authStatus.isLoggedIn === true) {
    return props.component;
  } else if (
    authStatus.isLoggedIn === false ||
    authStatus.isTokenOk === false
  ) {
    return <Login />;
  } else if (authError.status === 429) {
    return <Error429 />;
  } else if (authError.status === 400) {
    return <Error400 />;
  } else {
    return <Loading />;
  }
};

const AdminRoute = (props) => {
  const [authStatus, setAuthStatus] = React.useState("");
  const [authError, setAuthError] = React.useState({ data: "", status: "" });

  const sessionToken = sessionStorage.getItem("auth-token");

  React.useEffect(() => {
    Axios.get(
      "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/admin/auth/isLoggedIn",
      {
        headers: { sessionToken },
      }
    )
      .then((res) => setAuthStatus(res.data))
      .catch((err) => setAuthError({ data: err, status: err.response.status }));
  }, [sessionToken]);

  if (authStatus.isLoggedIn === true) {
    return props.component;
  } else if (
    authStatus.isLoggedIn === false ||
    authStatus.isTokenOk === false
  ) {
    return <AdminLogin />;
  } else if (authError.status === 429) {
    return <Error429 />;
  } else if (authError.status === 400) {
    return <Error400 />;
  } else {
    return <Loading />;
  }
};

export { ProtectedRoute, AdminRoute };
