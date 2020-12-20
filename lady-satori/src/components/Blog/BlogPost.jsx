import React from "react";
import Axios from "axios";
import Error400 from "../Errors/Error400";
// import Error429 from "../Errors/Error429";
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

const BlogPost = () => {
  const [data, setData] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    // Axios.get(
    //   "https://dizbkwjzdmgp2.cloudfront.net/" +
    //     "posts/2020/dezembro/1607918058018@lacinia-eget-consectetur-sed-convallis-at-tellus"
    // )
    Axios.get("https://dizbkwjzdmgp2.cloudfront.net" + window.location.pathname)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => setError({ err }));
  }, []);

  //  displaying the iframe element with 16:9 aspesct ratio
  React.useEffect(() => {
    if (document.getElementsByTagName("iframe")[0]) {
      const iframeElement = document.getElementsByTagName("iframe");

      const iframeWidth = getComputedStyle(iframeElement[0]).getPropertyValue(
        "width"
      );

      const iframeHeight = iframeWidth.replace("px", "") * 0.5625 + "px";

      Array.from(
        document.querySelectorAll("iframe"),
        (e) => (e.style.height = iframeHeight)
      );
    }
  });

  if (error) {
    console.log(error);
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
              <div className="col-md-6 row m-0 p-0">
                <img
                  className="author-pic col"
                  src="/images/dwight.jpg"
                  alt="..."
                />
                <div className="blog-post-info col">
                  <h6 className="author-name">Dwight Schrute</h6>
                  <h6 className="publish-date muted mb-auto">
                    {data.date} - {data.readTime}min de leitura
                  </h6>
                </div>
              </div>
              <div className="col-md-6 social-icons">
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
                    draftToHtml(JSON.parse(data.body)),
                    {
                      ADD_TAGS: ["iframe"],
                    }
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

export default BlogPost;
