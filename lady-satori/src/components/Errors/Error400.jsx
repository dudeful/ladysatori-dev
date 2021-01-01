import "../../styles/Error400.css";

function Error400() {
  return (
    <div>
      <section className="page_400">
        <div className="row">
          <div className="col-sm-12 col-sm-offset-1 text-center p-0">
            <div className="four_zero_four_bg">
              <h3 className="text-muted mb-0">error</h3>
              <h1 className="text-center">400</h1>
            </div>

            <div className="contant_box_400">
              <h3>Vishh, algo de errado não está certo &#x1F605;</h3>

              <p>parece que tivemos um problema em nossos servidores</p>

              <div className="error404Buttons mt-4">
                <button
                  className="btn btn-success"
                  onClick={() => window.history.back()}
                >
                  VOLTAR
                </button>
                <button
                  className="btn btn-success ml-3"
                  onClick={() => (window.location.pathname = "/")}
                >
                  HOME
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Error400;
