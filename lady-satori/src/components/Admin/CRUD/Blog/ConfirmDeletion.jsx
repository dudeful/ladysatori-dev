import Axios from "axios";

const ConfirmDeletion = (props) => {
  const delPost = () => {
    props.setUpdateState(false);
    const sessionToken = sessionStorage.getItem("auth-token");

    Axios.delete(
      // "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/admin/blog/delete-post",
      "http://localhost:5000/admin/blog/delete-post",
      {
        data: { key: props.postKey },
        headers: { sessionToken },
      }
    )
      .then((res) => {
        console.log(res.data);
        if (res.data.isLoggedIn === false || res.data.isTokenOk === false) {
          alert("você precisa estar logado para realizar esta operação");
          window.location.reload();
        } else if (res.data.error === true) {
          alert(
            "Oops! Parece que tivemos um erro com seu pedido, por favor tente novamente"
          );
          window.location.reload();
        } else {
          props.setUpdateState(true);
        }
      })
      .catch((err) => {
        if (err) console.log({ error: true, err });
      });
  };
  return (
    <div
      className="modal fade"
      id="confirmDeletionModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4
              className="modal-title text-danger row p-4"
              id="exampleModalLabel"
            >
              <span
                className="col-1 p-0 pr-2 text-center"
                style={{ fontSize: "50px" }}
              >
                &#10071;
              </span>
              <span className="col-11">
                Você tem certeza que deseja deletar este post?
              </span>
            </h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => delPost()}
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
            >
              DELETAR
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletion;
