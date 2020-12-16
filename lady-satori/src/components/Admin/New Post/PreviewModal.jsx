export const PreviewModal = ({ output }) => (
  <div
    className="modal fade"
    id="previewModal"
    tabIndex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
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
        <img
          className="preview-coverImg"
          src={
            output.coverImg === ""
              ? "https://envothemes.com/envo-magazine-pro/wp-content/uploads/sites/8/2018/04/no-image.jpg"
              : output.coverImg
          }
          alt="..."
        />

        <div className="modal-headings">
          <h4 className="tag text-muted font-weight-bold">
            {output.tag ? "#" + output.tag : "#SEM TAG"}
          </h4>

          <h2 className="title mb-4">
            {output.title ? output.title : "SEM TÍTULO"}
          </h2>

          <div className="col-md-6 social-icons only-mobile">
            <a
              href="https://twitter.com/SadhguruJV"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.facebook.com/sadhguru"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-facebook-square"></i>
            </a>
            <a
              href="https://wa.me/5521995165858"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-whatsapp-square"></i>
            </a>
          </div>

          <div className="row m-0 mt-3">
            <div className="col-lg-6 row m-0 p-0">
              <img
                className="author-pic col"
                src="/images/dwight.jpg"
                alt="..."
              />

              <div className="blog-post-info col">
                <h6 className="author-name">Dwight Schrute</h6>
                <h6 className="publish-date muted mb-auto">
                  {new Date().toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </h6>
              </div>
            </div>
            {/* <div className="col-md-6 p-0">
              <h6 className="last-updated mb-auto">Atualizado pela última vez em 11 de Novembro, 2020</h6>
            </div> */}
            <div className="col-lg-6 social-icons only-desktop">
              <a
                href="https://twitter.com/SadhguruJV"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://www.facebook.com/sadhguru"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-facebook-square"></i>
              </a>
              <a
                href="https://wa.me/5521995165858"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-whatsapp-square"></i>
              </a>
            </div>
          </div>
          <div
            className="modal-body p-0"
            dangerouslySetInnerHTML={{
              __html: output.body,
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
