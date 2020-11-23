import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./styles/Home.css";
import "./styles/Blog.css";
import "./styles/Aulas.css";
import "./styles/Sobre.css";
import "./styles/Header.css";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById("root")
);
