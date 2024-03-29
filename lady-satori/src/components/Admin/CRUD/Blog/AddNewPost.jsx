import DraftEditor from "./DraftEditor";
import axios from "axios";
import BlogAdmin from "../../BlogAdmin";

function AddNewPost(props) {
  //
  const getPostInputs = (inputs) => {
    const newPost = {
      coverImg: inputs.coverImg,
      tag: inputs.tag,
      title: inputs.title,
      body: inputs.body,
    };

    const sessionToken = sessionStorage.getItem("auth-token");
    axios
      .post(
        "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/blog/new-post",
        // "http://localhost:5000/blog/new-post",
        newPost,
        {
          headers: { Authorization: sessionToken },
        }
      )
      .then((res) => {
        if (res.data.isLoggedIn === false || res.data.isTokenOk === false) {
          alert("você precisa estar logado para realizar esta operação");
          window.location.reload();
        } else if (res.data.error === true) {
          alert(
            "Oops! Parece que tivemos um erro com seu pedido, por favor tente novamente"
          );
        } else {
          props.updateComponent({
            component: BlogAdmin,
            id: "admin_BlogAdmin",
          });
        }
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
