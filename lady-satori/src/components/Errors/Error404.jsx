import "../../styles/Error404.css";

function Error404() {
  document.addEventListener("DOMContentLoaded", function () {
    var body = document.body;
    setInterval(createStar, 100);
    function createStar() {
      var right = Math.random() * 500;
      var top = Math.random() * window.screen.height;
      var star = document.createElement("div");
      star.classList.add("error404Star");
      body.appendChild(star);
      setInterval(runStar, 10);
      star.style.top = top + "px";
      function runStar() {
        if (right >= window.screen.width) {
          star.remove();
        }
        right += 3;
        star.style.right = right + "px";
      }
    }
  });
  document.body.style.overflow = "hidden";
  return (
    <div className="error404Body">
      <div className="error404Body-text">
        <p>ERROR</p>
        <h1>404</h1>
        <hr />
        <p>Página Não Encontrada</p>
      </div>

      <div className="error404Astronaut">
        <img
          src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon-by-vexels.png"
          alt="astronaut"
          className="src"
        />
      </div>
      <div className="error404Buttons">
        <button
          className="btn btn-outline-light"
          onClick={() => window.history.back()}
        >
          VOLTAR
        </button>
        <button
          className="btn btn-outline-light ml-3"
          onClick={() => (window.location.pathname = "/")}
        >
          PÁGINA INICIAL
        </button>
      </div>
    </div>
  );
}
export default Error404;
