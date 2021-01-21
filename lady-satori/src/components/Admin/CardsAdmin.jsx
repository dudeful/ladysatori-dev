import { useState } from "react";
import ConfirmDeletion from "./CRUD/Blog/ConfirmDeletion";
import UpdatePost from "./CRUD/Blog/UpdatePost";

function CardsAdmin(props) {
  const [confirmModal, setConfirmModal] = useState({ key: "", modal: "" });
  //
  return (
    <div className="blog-cards cards-admin">
      <div className="home-container row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2">
        {props.data.map((card) => {
          return (
            <div className="col mb-5" key={card.id}>
              <div className="card-button">
                <button
                  onClick={() =>
                    props.updateComponent({
                      component: UpdatePost,
                      id: "admin_BlogAdmin",
                      props: { key: card.key.slice(11) },
                    })
                  }
                  className="btn btn1 btn-sm btn-warning w-50 bg-warning"
                >
                  atualizar
                </button>
                <button
                  onClick={() =>
                    setConfirmModal({ key: card.key.slice(11), modal: "modal" })
                  }
                  className="btn btn2 btn-sm btn-danger w-50 bg-danger"
                  data-toggle={confirmModal.modal}
                  data-target="#confirmDeletionModal"
                >
                  deletar
                </button>
              </div>
              <a
                target="_blank"
                rel="noreferrer"
                href={card.key.slice(10)}
                className="blog-card-link lead text-dark text-decoration-none"
              >
                <div className="card h-100">
                  <img
                    src={card.coverImg}
                    style={{
                      minHeight: 165,
                    }}
                    className="card-img-top"
                    alt="..."
                  />
                  <h5 className="text-muted ml-1">{"#" + card.tag}</h5>
                  <div className="card-body">
                    <h4>{card.title}</h4>
                    <p className="card-text">
                      {card.body.slice(0, 75) + "..."}
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
              </a>
            </div>
          );
        })}
      </div>
      <ConfirmDeletion
        updateComponent={props.updateComponent}
        postKey={confirmModal.key}
        setUpdateState={props.setUpdateState}
      />
    </div>
  );
}

export default CardsAdmin;
