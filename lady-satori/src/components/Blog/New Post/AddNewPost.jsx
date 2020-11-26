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

    axios
      .post("http://localhost:5000/posts/admin/new-post", newPost)
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
    <div className="addNewPost">
      <DraftEditor getPostInputs={getPostInputs} />
    </div>
  );
}

export default AddNewPost;
