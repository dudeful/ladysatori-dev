import axios from "axios";
import useAxios from "axios-hooks";
import UpdateDraftEditor from "./UpdateDraftEditor";
import Error400 from "../../Errors/Error400";
const _ = require("lodash");

function UpdatePost() {
  //use the url path to get the article object which will be rendered.
  const [{ data, loading, error }] = useAxios(
    "http://localhost:5000/posts/post/" + window.location.pathname.slice(13)
  );

  //handles loading delay and bad requests (400) errors.
  if (loading)
    return (
      <img
        src="/images/Infinity-2s-200px.svg"
        className="loading-infinity"
        alt="..."
      />
    );
  if (error) return <Error400 />;

  const getPostInputs = (updatedPost) => {
    axios
      .patch(
        "http://localhost:5000/posts/update-post/" +
          data._id +
          "/" +
          _.kebabCase(data.title),
        updatedPost
      )
      .then((res) => {
        console.log(res.data.console);
        window.location.assign(
          "http://localhost:3000/post/" +
            res.data.id +
            "/" +
            _.kebabCase(res.data.title)
        );
      });
  };

  return (
    <div className="updatePost">
      <UpdateDraftEditor getPostInputs={getPostInputs} postData={data} />
    </div>
  );
}

export default UpdatePost;
