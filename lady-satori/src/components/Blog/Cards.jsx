import React from "react";
import { Link } from "react-router-dom";

function Cards(props) {
  //
  return (
    <div className="blog-cards">
      <div className="home-container row row-cols-1 row-cols-lg-3 row-cols-md-2">
        {props.data.slice(1).map((card) => {
          return (
            <div className="col mb-5" key={card.id}>
              <Link
                to={card.key}
                className="blog-card-link lead text-dark text-decoration-none"
              >
                <div className="card h-100">
                  <img
                    src={card.coverImg}
                    style={{
                      minHeight: Math.floor(Math.random() * 150) + 200,
                    }}
                    className="card-img-top"
                    alt="..."
                  />
                  <h5 className="text-muted ml-1">{"#" + card.tag}</h5>
                  <div className="card-body">
                    <h4>{card.title}</h4>
                    <p className="card-text">
                      {JSON.parse(card.body).blocks[0].text.slice(0, 100) +
                        "..."}
                    </p>
                  </div>
                  <p className="card-text ml-auto p-3">
                    <small className="text-muted">
                      {card.date}
                      {" - "}
                      <span className="font-italic">
                        {card.readTime}min de leitura
                      </span>
                    </small>
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cards;
