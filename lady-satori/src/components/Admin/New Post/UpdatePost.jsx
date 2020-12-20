import axios from "axios";
import useAxios from "axios-hooks";
import UpdateDraftEditor from "./UpdateDraftEditor";
import Error400 from "../../Errors/Error400";

function UpdatePost() {
  //use the url path to get the article object which will be rendered.
  const [{ data, loading, error }] = useAxios(
    "https://dizbkwjzdmgp2.cloudfront.net/" + window.location.pathname.slice(13)
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
    const sessionToken = sessionStorage.getItem("auth-token");
    axios
      .post(
        "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/admin/blog/update-post/" +
          // "http://localhost:5000/admin/blog/update-post/" +
          updatedPost.key,
        updatedPost,
        {
          headers: { sessionToken },
        }
      )
      .then((res) => {
        window.location.assign(
          "https://main.d3ieky02gu560k.amplifyapp.com/" + updatedPost.key
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="updatePost">
      <UpdateDraftEditor getPostInputs={getPostInputs} postData={data} />
    </div>
  );
}

export default UpdatePost;
