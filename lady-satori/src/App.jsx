import React from "react";
import {
  useLocation,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SocialAuth from "./components/SocialAuth";
import Blog from "./components/Blog/Blog";
import Aulas from "./components/Aulas";
import Sobre from "./components/Sobre";
import BlogPost from "./components/Blog/BlogPost";
import AddNewPost from "./components/Blog/New Post/AddNewPost";
import UpdatePost from "./components/Blog/New Post/UpdatePost";
import Error404 from "./components/Errors/Error404";
import Error400 from "./components/Errors/Error400";
import PasswordReset from "./components/Login/PasswordReset";
import ProtectedRoute from "./ProtectedRoute";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/reset/:token" component={PasswordReset} exact />
          <Route path="/login" component={Login} exact />
          <Route
            path="/SocialAuth/:original_url/:auth_token"
            component={SocialAuth}
            exact
          />

          <Route path="/sobre" component={Sobre} exact />

          <Route path="/blog" exact>
            <ProtectedRoute component={<Blog />} />
          </Route>

          <Route path="/post/:id/:title" component={BlogPost} exact />
          <Route path="/new-post" component={AddNewPost} exact />
          <Route path="/update-post/:id/:title" component={UpdatePost} exact />

          <Route path="/yoga-class" exact>
            <ProtectedRoute component={<Aulas />} />
          </Route>

          <Route path="/error400" component={Error400} exact />
          <Route component={Error404} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
