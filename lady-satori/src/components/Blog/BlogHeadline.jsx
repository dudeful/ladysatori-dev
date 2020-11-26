import { Link } from "react-router-dom";
const _ = require("lodash");

function BlogHeadline(props) {
  //
  let data = props.data.slice(0)[0];

  return (
    <div className="blog-headline jumbotron jumbotron-fluid pt-3 pb-3">
      <img
        src={data.coverImg}
        className="img-fluid cover-img"
        alt="yoga-cover"
      />
      <div className="headline-container row">
        <div className="col-md-6">
          <p className="headline-title">{data.title}</p>
          <p className="headline-briefing">
            {JSON.parse(data.body).blocks[0].text.slice(0, 180) + "..."}
          </p>
          <Link
            to={"/post/" + data._id + "/" + _.kebabCase(data.title)}
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
              {data.date}
              {" - "}
              <span className="font-weight-light">
                {data.readTime}min de leitura
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogHeadline;
