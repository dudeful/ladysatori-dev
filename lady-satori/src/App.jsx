import React from "react";
import {
  useLocation,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Admin from "./components/Admin/Admin";
import AddNewPost from "./components/Admin/CRUD/Blog/AddNewPost";
import UpdatePost from "./components/Admin/CRUD/Blog/UpdatePost";
import Home from "./components/Home";
import Login from "./components/Login";
import SocialAuth from "./components/SocialAuth";
import PasswordReset from "./components/Login/PasswordReset";
import ClassRoom from "./components/ClassRoom";
import Blog from "./components/Blog/Blog";
import BlogPost from "./components/Blog/BlogPost";
import Sobre from "./components/Sobre";
import Error404 from "./components/Errors/Error404";
import Error400 from "./components/Errors/Error400";
import { ProtectedRoute, AdminRoute } from "./ProtectedRoute";

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
          <Route path="/admin" exact>
            <AdminRoute component={<Admin />} />
          </Route>

          <Route path="/" component={Home} exact />
          <Route
            path="/:role/reset/:token/:email"
            component={PasswordReset}
            exact
          />
          <Route path="/login" component={Login} exact />

          <Route
            path="/SocialAuth/:original_url/:auth_token"
            component={SocialAuth}
            exact
          />

          <Route path="/blog" component={Blog} exact />

          <Route
            path="/posts/:year/:month/:time_title"
            component={BlogPost}
            exact
          />

          <Route path="/sobre" component={Sobre} exact />

          <Route path="/admin/new-post" exact>
            <AdminRoute component={<AddNewPost />} />
          </Route>

          <Route path="/admin/update-post/posts/:year/:month/:time_title" exact>
            <AdminRoute component={<UpdatePost />} />
          </Route>

          <Route path="/yoga-class" exact>
            <ProtectedRoute component={<ClassRoom />} />
          </Route>

          <Route path="/error400" component={Error400} exact />
          <Route component={Error404} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
