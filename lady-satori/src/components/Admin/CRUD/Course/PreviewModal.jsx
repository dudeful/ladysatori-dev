import React from "react";

const PreviewModal = (props) => {
  return (
    <div
      className="modal fade"
      id="previewModalLesson"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-briefing modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLessonLabel">
              Preview
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

          <div className="modal-headings">
            <div
              className="modal-briefing modal-body"
              dangerouslySetInnerHTML={{
                __html: props.body,
              }}
            />
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
};

export default PreviewModal;
