import DraftEditor from "./DraftEditor";
import axios from "axios";
const _ = require("lodash");

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
      .post("http://localhost:5000/admin/blog/new-post", newPost, {
        headers: { sessionToken },
      })
      .then((res) => {
        window.location.assign(
          "http://localhost:3000/post/" +
            res.data.id +
            "/" +
            _.kebabCase(res.data.title)
        );
      });
  };

  return (
    <div className="addNewPost">
      <DraftEditor getPostInputs={getPostInputs} />
    </div>
  );
}

export default AddNewPost;
