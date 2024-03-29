import { Redirect } from "react-router-dom";

const { pathname } = window.location;
const auth_token = pathname.split("/").slice(-1);
const user_id = pathname.split("/").slice(-2, -1)[0];

const SocialAuth = () => {
  localStorage.removeItem("auth-token");
  sessionStorage.setItem("auth-token", auth_token);
  sessionStorage.setItem("user_id", user_id);

  return <Redirect to={pathname.split("/")[2].replace(/@fSlash@/g, "/")} />;
};

export default SocialAuth;
