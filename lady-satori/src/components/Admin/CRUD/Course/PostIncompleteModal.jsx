export const PostIncompleteModal = (props) => (
  <div
    className="modal fade"
    id="postIncompleteLessonModal"
    tabIndex="-1"
    aria-labelledby="exampleLessonModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-danger" id="exampleLessonModalLabel">
            {props.msg.title}
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
        <div className="modal-body">{props.msg.body}</div>
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
