import { Redirect } from "react-router-dom";

const { pathname } = window.location;
const auth_token = pathname.split("/").slice(-1);

const SocialAuth = () => {
  localStorage.removeItem("auth-token");
  sessionStorage.setItem("auth-token", auth_token);

  return <Redirect to={pathname.split("/")[2].replace(/@fSlash@/g, "/")} />;
};

export default SocialAuth;
