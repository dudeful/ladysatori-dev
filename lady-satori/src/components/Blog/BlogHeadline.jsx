import { Link } from "react-router-dom";

function BlogHeadline(props) {
  //

  return (
    <div className="blog-headline jumbotron jumbotron-fluid pt-3 pb-3">
      <img
        src={props.data.coverImg}
        className="img-fluid cover-img"
        alt="yoga-cover"
      />
      <div className="headline-container row">
        <div className="col-md-6">
          <p className="headline-title">{props.data.title}</p>
          <p className="headline-briefing">
            {props.data.body.slice(0, 180) + "..."}
          </p>
          <Link
            to={props.data.key.slice(10)}
            className="blog-card-link lead text-dark text-decoration-none"
          >
            <button className="btn btn-outline-light btn-block mb-4">
              LER POST
            </button>
          </Link>
        </div>
        <div className="col-md-6 headline-info-col">
          <div className="headline-info">
            <p className="font-weight-light font-italic">mais recente</p>
            <p className="text-dark">
              {props.data.date}
              {" - "}
              <span className="font-weight-light">
                {props.data.readTime}min de leitura
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogHeadline;
