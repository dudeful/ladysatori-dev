import DraftEditor from "./DraftEditor";
import axios from "axios";

function AddNewPost() {
  //
  const getPostInputs = (inputs) => {
    // console.log(inputs);

    const newPost = {
      coverImg: inputs.coverImg,
      tag: inputs.tag,
      title: inputs.title,
      body: inputs.body,
    };

    const sessionToken = sessionStorage.getItem("auth-token");
    axios
      .post(
        "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/admin/blog/new-post",
        // "http://localhost:5000/admin/blog/tests-only",
        newPost,
        {
          headers: { sessionToken },
        }
      )
      .then((res) => {
        // window.location.assign("http://localhost:3000/" + res.data.key);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="addNewPost">
      <DraftEditor getPostInputs={getPostInputs} />
    </div>
  );
}

export default AddNewPost;
