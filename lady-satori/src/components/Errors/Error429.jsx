import "../../styles/Error429.css";

const Error429 = () => {
  return (
    <div className="container error429">
      <img
        src="images/Errors/Error429-2.jpg"
        alt="Error 429 - Too Many Requests"
      />
      <div className="message429">
        <p>Ainda não conseguimos lidar com tanto amor 😅</p>
      </div>
      <div className="buttons429">
        <button
          className="btn btn-sm btn-warning"
          onClick={() => window.history.back()}
        >
          VOLTAR
        </button>
        <button
          className="btn btn-sm btn-warning"
          onClick={() => (window.location.pathname = "/")}
        >
          HOME
        </button>
      </div>
    </div>
  );
};

export default Error429;
