import React from "react";
import { InlineShareButtons } from "sharethis-reactjs";
import axios from "axios";
import useAxios from "axios-hooks";
import DOMPurify from "dompurify";
import draftToHtml from "draftjs-to-html";
import { Link } from "react-router-dom";
import Header from "../Header";
import RecentPosts from "./RecentPosts";
import Footer from "../Footer";
import Error400 from "../Errors/Error400";
import Error429 from "../Errors/Error429";
import Loading from "../Errors/Loading";

DOMPurify.addHook("afterSanitizeAttributes", function (node) {
  // set all elements owning target to target=_blank
  if ("target" in node) {
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener");
  }
});

function BlogPost() {
  //use the url path to get the article object which will be rendered.
  const [{ data, loading, error }] = useAxios(
    "http://localhost:5000/posts" + window.location.pathname
  );

  // const [data, setData] = React.useState();

  // axios
  //   .get("http://localhost:5000/posts" + window.location.pathname)
  //   .then((res) => setData(res.data));

  //handles loading delay and bad requests (400) errors.
  if (loading) return <Loading />;

  if (error) {
    //check if it is an rate-limiting error
    if (error.toJSON().message.split(" ").slice(-1)[0] === "429") {
      //if afirmative, send custom "too many requests" error message
      return <Error429 />;
    } else {
      return <Error400 />;
    }
  }

  // if (!data) {
  //   return (
  //     <img
  //       src="/images/Infinity-2s-200px.svg"
  //       className="loading-infinity"
  //       alt="..."
  //     />
  //   );
  // }

  const deletePost = () => {
    const sessionToken = sessionStorage.getItem("auth-token");
    axios
      .delete("http://localhost:5000/admin/blog/delete-post/" + data._id, {
        headers: { sessionToken },
      })
      .then(() => {
        window.location.assign("http://localhost:3000/blog");
      });
  };

  return (
    <div className="blogPost-body">
      <Header current={"blog"} />
      <div className="blog-post">
        <button
          onClick={deletePost}
          className="m-2 btn btn-outline-danger lead"
        >
          DELETE
        </button>
        <Link
          to={"/update-post/" + data.key}
          className="btn btn-outline-warning lead text-decoration-none"
        >
          UPDATE
        </Link>
        <img
          className="cover-img"
          //   src="https://besthqwallpapers.com/img/original/19526/yoga-woman-sunset-meditation-yoga-poses.jpg"
          src={data.coverImg}
          alt="..."
        />

        <div className="post-container">
          <h3 className="tag text-muted font-weight-bold">{"#" + data.tag}</h3>

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
              {/* <h6 className="last-updated mb-auto mt-2">
                Atualizado pela última vez em 11 de Novembro, 2020
              </h6> */}
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
                __html: DOMPurify.sanitize(draftToHtml(JSON.parse(data.body))),
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
        <RecentPosts />
      </div>
      <Footer />
    </div>
  );
}

export default BlogPost;
