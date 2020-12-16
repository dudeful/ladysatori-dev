import React from "react";
import Axios from "axios";
import Error400 from "../Errors/Error400";
import Loading from "../Errors/Loading";
import Header from "../Header";
import BlogHeadline from "../Blog/BlogHeadline";
import Cards from "../Blog/Cards";

console.log("hey in there!");

const Test = () => {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(false);
  console.log("hey out there!");

  React.useEffect(() => {
    Axios.get(
      "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/admin/aws"
    )
      .then((res) => {
        //
        const postsArray = res.data.map(async (postURL) => {
          const res = await Axios.get(postURL);
          return res.data;
        });

        Promise.all(postsArray).then((values) => {
          setData(values);
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

          <BlogHeadline data={data} />
          <Cards data={data} />
        </div>
      </div>
    );
  }
};

export default Test;
