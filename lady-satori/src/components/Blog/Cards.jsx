import React from "react";
import { Link } from "react-router-dom";

function Cards(props) {
  //
  return (
    <div className="blog-cards">
      <div className="home-container row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2">
        {props.data.map((card) => {
          const imgHeight = Math.floor(Math.random() * 150) + 200;
          const textLength = 100 - imgHeight;
          return (
            <div className="col mb-5" key={card.id}>
              <Link
                to={card.key.slice(10)}
                className="blog-card-link lead text-dark text-decoration-none"
              >
                <div className="card h-100">
                  <img
                    src={card.coverImg}
                    style={{
                      minHeight: imgHeight,
                    }}
                    className="card-img-top"
                    alt="..."
                  />
                  <h5 className="text-muted ml-1">{"#" + card.tag}</h5>
                  <div className="card-body">
                    <h4>{card.title}</h4>
                    <p className="card-text">
                      {card.body.slice(0, textLength) + "..."}
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
