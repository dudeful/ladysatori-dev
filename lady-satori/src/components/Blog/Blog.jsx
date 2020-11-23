import React from "react";
// import { Link } from "react-router-dom";
// import { HashLink } from "react-router-hash-link";
import Header from "../Header";
import BlogHeadline from "./BlogHeadline";
import Cards from "./Cards";
import useAxios from "axios-hooks";

function Blog() {
  //gets the cards object on the server which will be rendered on the page.
  const [{ data, loading, error }] = useAxios("http://localhost:5000/posts/");

  //handles loading delay and bad requests (400) errors.
  if (loading)
    return (
      <img
        src="/images/Infinity-2s-200px.svg"
        className="loading-infinity"
        alt="..."
      />
    );
  if (error) return <p />;

  return (
    <div>
      <Header current={"blog"} />

      <BlogHeadline data={data} />

      <Cards data={data} />

      {/* <div className="row m-0 p-3 bg-secondary">
        <Link
          to={"/"}
          className="col-3 text-center text-light text-decoration-none m-0"
        >
          Home
        </Link>
        <Link
          to={"/aulas-yoga"}
          className="col-3 text-center text-light text-decoration-none"
        >
          Aulas
        </Link>
        <HashLink
          to="/#get-in-touch"
          className="col-3 text-center text-light text-decoration-none"
        >
          Contato
        </HashLink>
        <Link
          to={"/sobre"}
          className="col-3 text-center text-light text-decoration-none"
        >
          Sobre
        </Link>
      </div> */}
    </div>
  );
}

export default Blog;
