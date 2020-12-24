import { useState, useEffect } from "react";
import Axios from "axios";
import Loading from "../Errors/Loading";
import Error400 from "../Errors/Error400";
import CardsAdmin from "./CardsAdmin";

const BlogAdmin = (props) => {
  const [updateState, setUpdateState] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
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
  }, [updateState]);

  if (error) {
    console.log(error);
    return <Error400 />;
  } else if (!data[0]) {
    return <Loading />;
  } else {
    return (
      <div>
        <div className="blogBody">
          <CardsAdmin
            data={data}
            updateComponent={props.updateComponent}
            setUpdateState={setUpdateState}
          />
        </div>
      </div>
    );
  }
};

export default BlogAdmin;
