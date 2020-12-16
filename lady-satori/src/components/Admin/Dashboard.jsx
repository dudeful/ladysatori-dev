import React from "react";
import Axios from "axios";
import Login from "../Login";
import Error400 from "../Errors/Error400";
import Error429 from "../Errors/Error429";
import Loading from "../Errors/Loading";
import Header from "../Header";
import DOMPurify from "dompurify";
import draftToHtml from "draftjs-to-html";
import { InlineShareButtons } from "sharethis-reactjs";
// import RecentPosts from "./RecentPosts";
import Footer from "../Footer";

DOMPurify.addHook("afterSanitizeAttributes", function (node) {
  // set all elements owning target to target=_blank
  if ("target" in node) {
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener");
  }
});

const Dashboard = () => {
  const [data, setData] = React.useState("");
  const [error, setError] = React.useState({ data: "", status: "" });

  const localToken = localStorage.getItem("auth-token");
  const sessionToken = sessionStorage.getItem("auth-token");

  React.useEffect(() => {
    Axios.get(
      "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/admin/aws/",
      {
        headers: { localToken, sessionToken },
      }
    )
      .then((res) => {
        Axios.get(res.data)
          .then((res) => setData(res.data))
          .catch((err) => setError({ data: err, status: err.response.status }));
      })
      .catch((err) => setError({ data: err, status: err.response.status }));
  }, [localToken, sessionToken]);

  if (data.isTokenOk === false) {
    return <Login />;
  } else if (error.status === 429) {
    return <Error429 />;
  } else if (error.status === 400) {
    return <Error400 />;
  } else if (!data) {
    return <Loading />;
  } else {
    return (
      <div className="blogPost-body">
        <Header current={"blog"} />
        <div className="blog-post">
          <img className="cover-img" src={data.coverImg} alt="..." />

          <div className="post-container">
            <h3 className="tag text-muted font-weight-bold">
              {"#" + data.tag}
            </h3>

            <h1 className="title">{data.title}</h1>

            <div className="row m-0">
              <div className="col-md-6 p-0 social-icons only-mobile">
                <a
                  href="https://twitter.com/SadhguruJV"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="https://www.facebook.com/sadhguru"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-facebook-square"></i>
                </a>
                <a
                  href="https://wa.me/5521995165858"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-whatsapp-square"></i>
                </a>
              </div>
              <div className="col-md-6 p-0">
                <h6 className="author-name">John Doe</h6>
                <h6 className="publish-date muted mb-auto">
                  {data.date} - {data.readTime}min de leitura
                </h6>
              </div>
              <div className="col-md-6 p-0 social-icons">
                <a
                  href="https://twitter.com/SadhguruJV"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="https://www.facebook.com/sadhguru"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-facebook-square"></i>
                </a>
                <a
                  href="https://wa.me/5521995165858"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-whatsapp-square"></i>
                </a>
              </div>
            </div>

            <div className="main-content">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    draftToHtml(JSON.parse(data.body))
                  ),
                }}
              />
            </div>

            <hr />
            <div className="share-buttons">
              <h6>Gostou? Compartilhe!</h6>
              <InlineShareButtons
                config={{
                  alignment: "left", // alignment of buttons (left, center, right)
                  color: "social", // set the color of buttons (social, white)
                  enabled: true, // show/hide buttons (true, false)
                  font_size: 16, // font size for the buttons
                  labels: "null", // button labels (cta, counts, null)
                  language: "en", // which language to use (see LANGUAGES)
                  networks: [
                    // which networks to include (see SHARING NETWORKS)
                    "whatsapp",
                    "facebook",
                    "linkedin",
                    "reddit",
                    "messenger",
                    "twitter",
                  ],
                  padding: 12, // padding within buttons (INTEGER)
                  radius: 4, // the corner radius on each button (INTEGER)
                  show_total: false,
                  size: 50, // the size of each button (INTEGER)
                }}
              />
            </div>
          </div>
          {/* <RecentPosts /> */}
        </div>
        <Footer />
      </div>
    );
  }
};

export default Dashboard;
