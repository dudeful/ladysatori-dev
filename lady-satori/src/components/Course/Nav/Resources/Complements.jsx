const LessonComplements = (props) => {
  return (
    <div>
      {props.resources.complements ? (
        props.resources.complements.body.map((complement) => {
          return (
            <div
              key={complement.title + complement.link}
              className="lesson_resources_complement"
            >
              <a
                className="text-decoration-none text-info"
                href={complement.link}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fas fa-folder-open mr-2 text-muted"></i>
                {complement.title}
              </a>
            </div>
          );
        })
      ) : (
        <i className="text-muted">
          Nenhum complemento foi adicionado a <b>esta aula</b> ainda
        </i>
      )}
    </div>
  );
};

const AllComplements = (props) => {
  return (
    <div>
      {props.resources.complements_all ? (
        props.resources.complements_all.map((complements) => {
          return complements.body.map((complement) => {
            return (
              <div key={complements.key + Math.random()}>
                <a
                  className="text-decoration-none text-info"
                  href={complement.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="lesson_resources_complement">
                    <i className="fas fa-folder-open mr-2 text-muted"></i>
                    <span className="text-dark h6">
                      {"Módulo " + complements.key.split("/")[2].slice(-1)} -{" "}
                    </span>
                    <span className="text-muted">
                      {complements.key.split("/")[4].slice(-1) +
                        ". " +
                        complements.key.split("/")[5].replaceAll("_", " ")}
                      :
                    </span>{" "}
                    {complement.title}
                  </div>
                </a>
              </div>
            );
          });
        })
      ) : (
        <i className="text-muted">
          Nenhum complemento foi adicionado <b>ao curso</b> ainda
        </i>
      )}
    </div>
  );
};

const Complements = { LessonComplements, AllComplements };

export default Complements;
