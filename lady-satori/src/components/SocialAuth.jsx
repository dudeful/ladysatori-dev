import { Redirect } from "react-router-dom";

function SocialAuth() {
  if (window.location.pathname.slice(12, 13) === "G") {
    sessionStorage.removeItem("auth-token");
    localStorage.setItem("auth-token", window.location.pathname.slice(19));
  } else if (window.location.pathname.slice(12, 13) === "F") {
    sessionStorage.removeItem("auth-token");
    localStorage.setItem("auth-token", window.location.pathname.slice(21));
  } else if (window.location.pathname.slice(12, 13) === "T") {
    sessionStorage.removeItem("auth-token");
    localStorage.setItem("auth-token", window.location.pathname.slice(20));
  }

  return <Redirect to={"/aulas-yoga"} />;
}

export default SocialAuth;
