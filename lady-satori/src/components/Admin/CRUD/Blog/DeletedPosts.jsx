// import React from "react";
// import Axios from "axios";
// import Loading from "../Errors/Loading";
// import Error400 from "../Errors/Error400";
// import CardsAdmin from "./CardsAdmin";

// const DeletedPosts = (props) => {
//   const [data, setData] = React.useState([]);
//   const [error, setError] = React.useState(false);

//   React.useEffect(() => {
//     Axios.get(
//       "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/blog/deleted-posts"
//     )
//       .then((res) => {
//         console.log(res.data);
//         //
//         // const postsArray = res.data.urls.map(async (postURL) => {
//         //   const res = await Axios.get(postURL);
//         //   return res.data;
//         // });

//         // Promise.all(postsArray).then((urls) => {
//         //   setData(urls);
//         // });
//       })
//       .catch((err) => setError(err));
//   }, []);

//   if (error) {
//     console.log(error);
//     return <Error400 />;
//   } else if (!data[0]) {
//     return <Loading />;
//   } else {
//     return (
//       <div>
//         <div className="blogBody">
//           {/* <CardsAdmin data={data} props={props.props} /> */}
//         </div>
//       </div>
//     );
//   }
// };

// export default DeletedPosts;
