const ConfirmBox = (props) => {
  return (
    <div
      style={{ backgroundColor: "#373a40b0" }}
      className="modal fade"
      id="confirmBoxModal"
      tabIndex="-1"
      aria-labelledby="exampleConfirmBoxModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-danger" id="exampleConfirmBoxModal">
              Tem certeza?
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
          <div className="modal-body text-dark font-weight-bold">
            {props.modalBody}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              data-dismiss="modal"
            >
              Cancelar
            </button>

            <button
              onClick={() => props.confirm(props.arg)}
              type="button"
              className="btn btn-sm btn-danger"
              data-dismiss="modal"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
