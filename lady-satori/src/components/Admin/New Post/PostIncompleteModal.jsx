export const PostIncompleteModal = () => (
  <div
    className="modal fade"
    id="postIncompleteModal"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-danger" id="exampleModalLabel">
            Existem campos vazios!
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          Parece que você esqueceu de preencher alguma coisa{" "}
          <span role="img" aria-label="detective-emoji">
            &#129488;
          </span>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
);
