import { Link } from "react-router-dom";
import useAxios from "axios-hooks";
import Error400 from "../Errors/Error400";
import Loading from "../Errors/Loading";
const _ = require("lodash");

function RecentPosts() {
  const [{ data, loading, error }] = useAxios(
    "https://91mtnc4fs8.execute-api.sa-east-1.amazonaws.com/dev/posts/latest"
  );

  //handles loading delay and bad requests (400) errors.
  if (loading) return <Loading />;

  if (error) return <Error400 />;

  return (
    <div>
      <h4 className="recent-posts-title">outras publicações recentes</h4>
      <div className="recent-posts row">
        {data.map((card) => {
          return (
            <div className="recent-post-card col-xl-4 p-0" key={card._id}>
              <Link
                to={"/post/" + card._id + "/" + _.kebabCase(card.title)}
                className="text-info text-decoration-none"
              >
                <div className="card">
                  <div className="row no-gutters">
                    <div className="col-4">
                      <img src={card.coverImg} className="card-img" alt="..." />
                    </div>
                    <div className="col-8">
                      <div className="card-body">
                        <h5 className="card-title">{card.title}</h5>
                        <p className="card-text">
                          {JSON.parse(card.body).blocks[0].text.slice(0, 40) +
                            "..."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentPosts;
