import React from "react";
import {
  useLocation,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import Blog from "./components/Blog/Blog";
import Aulas from "./components/Aulas";
import Sobre from "./components/Sobre";
import BlogPost from "./components/Blog/BlogPost";
import AddNewPost from "./components/Blog/New Post/AddNewPost";

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/blog" component={Blog} exact />
          <Route path="/aulas-yoga" component={Aulas} exact />
          <Route path="/sobre" component={Sobre} exact />
          <Route path="/new-post" component={AddNewPost} exact />
          <Route path="/post/:id/:title" component={BlogPost} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
