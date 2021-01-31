import "../../../styles/ClassRoom.css";
import { Link } from "react-router-dom";

const HorizontalNav = () => {
  const logout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("user_id");
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user_id");
    window.location.assign("/");
  };

  return (
    <div>
      <div className="h-navbar">
        <div className="row p-0 m-0">
          <div className="classroom-profile col row m-0">
            <Link to={"/"} className="navbar-brand">
              lady Satori
            </Link>
            <a
              className="notification btn p-0"
              href="#0"
              role="button"
              id="dropdownNotifications"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img src="/images/Admin/notifications.png" alt="..." />
            </a>
            <div className="navSeparator" />
            <div
              className="dropdown-notifications dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdownNotifications"
            >
              <a className="notification dropdown-item" href="#0">
                <div className="row m-0 p-0">
                  <div className="notificationDivImg col-2 m-0">
                    <img src="/images/Admin/classes.png" alt="..." />
                  </div>
                  <div className="col-10 m-auto pr-0 pl-2 pr-0 pl-2">
                    <p className="text-muted mb-2">Uma Live Começou!</p>
                    <p className="text-dark m-0">
                      Lorem ipsum, dolor sit adipisicing amet elit consectetur.
                    </p>
                  </div>
                </div>
              </a>
              <hr className="m-0" />
              <a className="notification dropdown-item" href="#0">
                <div className="row m-0 p-0">
                  <div className="notificationDivImg col-2 m-0">
                    <img src="/images/Admin/blog.png" alt="..." />
                  </div>
                  <div className="col-10 m-auto pr-0 pl-2">
                    <p className="text-muted mb-2">Blog</p>
                    <p className="text-dark m-0">
                      Molestias officiis voluptates dignissimos magni iste
                      magnam laboriosam nobis repellendus.
                    </p>
                  </div>
                </div>
              </a>
              <hr className="m-0" />
              <a className="notification dropdown-item" href="#0">
                <div className="row m-0 p-0">
                  <div className="notificationDivImg col-2 m-0">
                    <img src="/images/Admin/classes.png" alt="..." />
                  </div>
                  <div className="col-10 m-auto pr-0 pl-2">
                    <p className="text-muted mb-2">Próximas Aulas</p>
                    <p className="text-dark m-0">
                      Molestias officiis voluptates dignissimos magni iste
                      magnam.
                    </p>
                  </div>
                </div>
              </a>
              <hr className="m-0" />
              <a className="notification dropdown-item" href="#0">
                <h6 className="text-info text-center">
                  Ver Todas as Notificações
                </h6>
              </a>
            </div>
            <img className="profile-pic" src="/images/dwight.jpg" alt="..." />
            <div className="dropdown">
              <a
                className="btn dropdown-toggle"
                href="#0"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dwight Schrute
              </a>

              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownMenuLink"
              >
                <Link to={"/user-profile"} className="dropdown-item">
                  Perfil
                </Link>
                <Link to={"/curso-completo"} className="dropdown-item">
                  Curso Completo
                </Link>
                <Link to={"/aulas-ao-vivo"} className="dropdown-item">
                  Aulas ao Vivo
                </Link>
                <Link to={"/master-classes"} className="dropdown-item">
                  Master Classes
                </Link>
                <hr className="mb-1" />
                <a
                  onClick={() => logout()}
                  className="dropdown-item text-center text-danger p-0"
                  href="#0"
                >
                  sair
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hamburguer-menu col p-0">
        <button
          className="navbar-toggler border-0 m-0 pr-2 pl-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarVNavDropdown_course"
          aria-controls="navbarVNavDropdown_course"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <img src="/images/Admin/hamburguer-menu.png" alt="..." />
        </button>
      </div>
    </div>
  );
};

export default HorizontalNav;
