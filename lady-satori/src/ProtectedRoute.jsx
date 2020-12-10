import React from "react";
import Axios from "axios";
import Login from "./components/Login";
import Error429 from "./components/Errors/Error429";
import Loading from "./components/Errors/Loading";

console.log("outside");

const ProtectedRoute = (props) => {
  console.log("A PrivateRoute has been called:", props.component.type.name);

  const [authStatus, setAuthStatus] = React.useState("");
  const [authError, setAuthError] = React.useState({ data: "", status: "" });

  const localToken = localStorage.getItem("auth-token");
  const sessionToken = sessionStorage.getItem("auth-token");

  React.useEffect(() => {
    Axios.get("http://localhost:5000/auth/isLoggedIn", {
      headers: { localToken, sessionToken },
    })
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
  } else {
    return <Loading />;
  }
};

export default ProtectedRoute;
