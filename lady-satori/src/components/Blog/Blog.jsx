import React from "react";
import Axios from "axios";
import Error400 from "../Errors/Error400";
import Loading from "../Errors/Loading";
import Header from "../Header";
import BlogHeadline from "../Blog/BlogHeadline";
import Cards from "../Blog/Cards";

const Blog = () => {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    Axios.get(
      "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/admin/aws"
    )
      .then((res) => {
        //
        const postsArray = res.data.urls.map(async (postURL) => {
          const res = await Axios.get(postURL);
          return res.data;
        });

        Promise.all(postsArray).then((urls) => {
          setData(urls);
        });
      })
      .catch((err) => setError(err));
  }, []);

  if (error) {
    console.log(error);
    return <Error400 />;
  } else if (!data[0]) {
    return <Loading />;
  } else {
    return (
      <div>
        <div className="blogBody">
          <Header current={"blog"} />

          <BlogHeadline data={data.slice(0)[0]} />
          <Cards data={data.slice(1)} />
        </div>
      </div>
    );
  }
};

export default Blog;
