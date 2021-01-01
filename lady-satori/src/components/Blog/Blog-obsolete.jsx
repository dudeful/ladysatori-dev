// import React from "react";
// // import { Link } from "react-router-dom";
// // import { HashLink } from "react-router-hash-link";
// import Header from "../Header";
// import BlogHeadline from "./BlogHeadline";
// import Cards from "./Cards";
// import useAxios from "axios-hooks";
// import Error400 from "../Errors/Error400";
// import Error429 from "../Errors/Error429";
// import Loading from "../Errors/Loading";

// function Blog() {
//   //gets the cards object on the server which will be rendered on the page.
//   const [{ data, loading, error }] = useAxios(
//     "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/posts/"
//   );

//   //handles loading delay and bad requests (400) errors.
//   if (loading) return <Loading />;

//   if (error) {
//     //check if it is an rate-limiting error
//     if (error.toJSON().message.split(" ").slice(-1)[0] === "429") {
//       //if afirmative, send custom "too many requests" error message
//       return <Error429 />;
//     } else {
//       return <Error400 />;
//     }
//   }

//   return (
//     <div className="blogBody">
//       <Header current={"blog"} />

//       <BlogHeadline data={data} />

//       <Cards data={data} />

//       {/* <div className="row m-0 p-3 bg-secondary">
//         <Link
//           to={"/"}
//           className="col-3 text-center text-light text-decoration-none m-0"
//         >
//           Home
//         </Link>
//         <Link
//           to={"/aulas-yoga"}
//           className="col-3 text-center text-light text-decoration-none"
//         >
//           Aulas
//         </Link>
//         <HashLink
//           to="/#get-in-touch"
//           className="col-3 text-center text-light text-decoration-none"
//         >
//           Contato
//         </HashLink>
//         <Link
//           to={"/sobre"}
//           className="col-3 text-center text-light text-decoration-none"
//         >
//           Sobre
//         </Link>
//       </div> */}
//     </div>
//   );
// }

// export default Blog;
