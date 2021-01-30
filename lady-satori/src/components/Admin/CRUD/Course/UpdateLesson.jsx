import axios from "axios";
import useAxios from "axios-hooks";
import UpdateDraftEditor from "./UpdateDraftEditor";
import Error400 from "../../../Errors/Error400";
import Course from "../../Course";

function UpdateLesson(props) {
  //use the url path to get the article object which will be rendered.
  const [{ data, loading, error }] = useAxios(
    "https://d1or0rfi63vb4e.cloudfront.net/" + props.props.key
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

  const getInputs = (briefing) => {
    const sessionToken = sessionStorage.getItem("auth-token");
    axios
      .post(
        "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/course/update-lesson/" +
          props.props.key,
        briefing,
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
          props.updateComponent({ component: Course, id: "admin_Course" });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="updatePost">
      <UpdateDraftEditor getInputs={getInputs} postData={data} />
    </div>
  );
}

export default UpdateLesson;
