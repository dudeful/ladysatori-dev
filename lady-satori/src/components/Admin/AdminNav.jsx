import { useEffect } from "react";
import AddNewPost from "./CRUD/Blog/AddNewPost";
import ClassRoom from "../ClassRoom";
import BlogAdmin from "./BlogAdmin";
import DashboardCourse from "./DashboardCourse";
import DashboardBlog from "./DashboardBlog";
import TrashBin from "./TrashBin";
import NewClass from "./CRUD/Classes/NewClass";

const VerticalNav = (props) => {
  useEffect(() => {
    const elementId = document.getElementById(
      "admin_" + props.component.component.name
    );
    if (elementId) {
      document.getElementsByClassName("active")[0].classList.remove("active");
      elementId.classList.add("active");
    }
  }, [props.component]);

  return (
    <div className="navbar-expand-md">
      <div className="collapse navbar-collapse" id="navbarVNavDropdown">
        <div className="v-navbar-lg">
          <div className="admin-panel">
            <span>
              <img src="/images/yoga.png" alt="..." />
              <span className="align-middle">Painel Admin</span>
            </span>
          </div>
          <hr className="mt-0" />
          <nav className="nav flex-column" role="tablist">
            <a
              onClick={() =>
                props.updateComponent({
                  component: DashboardCourse,
                })
              }
              className="nav-link active"
              href="#0"
              data-toggle="tab"
              role="tab"
              aria-selected="true"
              id="admin_DashboardCourse"
            >
              <span>
                <img src="/images/Admin/dashboard.png" alt="..." />
              </span>
              Dashboard - Curso
            </a>
            <a
              onClick={() =>
                props.updateComponent({
                  component: ClassRoom,
                })
              }
              className="nav-link"
              href="#0"
              data-toggle="tab"
              role="tab"
              aria-selected="true"
              id="admin_ClassRoom"
            >
              <span>
                <img src="/images/Admin/classes.png" alt="..." />
              </span>
              Aulas
            </a>
            <a
              onClick={() =>
                props.updateComponent({
                  component: NewClass,
                })
              }
              className="nav-link"
              href="#0"
              data-toggle="tab"
              role="tab"
              aria-selected="true"
              id="admin_NewClass"
            >
              <span>
                <img src="/images/Admin/new-class.png" alt="..." />
              </span>
              Nova Aula
            </a>
            <a
              onClick={() =>
                props.updateComponent({
                  component: DashboardBlog,
                })
              }
              className="nav-link"
              href="#0"
              data-toggle="tab"
              role="tab"
              aria-selected="true"
              id="admin_DashboardBlog"
            >
              <span>
                <img src="/images/Admin/dashboard.png" alt="..." />
              </span>
              Dashboard - Blog
            </a>
            <a
              onClick={() => props.updateComponent({ component: BlogAdmin })}
              className="nav-link"
              href="#0"
              data-toggle="tab"
              role="tab"
              aria-selected="true"
              id="admin_BlogAdmin"
            >
              <span>
                <img src="/images/Admin/blog.png" alt="..." />
              </span>
              Posts
            </a>
            <a
              onClick={() =>
                props.updateComponent({
                  component: AddNewPost,
                })
              }
              className="nav-link"
              href="#0"
              data-toggle="tab"
              role="tab"
              aria-selected="true"
              id="admin_AddNewPost"
            >
              <span>
                <img src="/images/Admin/new-post.png" alt="..." />
              </span>
              Novo Post
            </a>
            <a
              onClick={() =>
                props.updateComponent({
                  component: TrashBin,
                })
              }
              className="nav-link"
              href="#0"
              data-toggle="tab"
              role="tab"
              aria-selected="true"
              id="admin_TrashBin"
            >
              <span>
                <img src="/images/Admin/trash-bin.png" alt="..." />
              </span>
              Lixeira
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

const HorizontalNav = () => {
  return (
    <div>
      <div className="h-navbar-lg">
        <div className="row p-0 m-0">
          <div className="admin-profile col row m-0">
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
                    <p className="text-muted mb-2">Aulas</p>
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
                    <img src="/images/Admin/dashboard.png" alt="..." />
                  </div>
                  <div className="col-10 m-auto pr-0 pl-2">
                    <p className="text-muted mb-2">Dashboard - Blog</p>
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
                    <img src="/images/Admin/blog.png" alt="..." />
                  </div>
                  <div className="col-10 m-auto pr-0 pl-2">
                    <p className="text-muted mb-2">Posts</p>
                    <p className="text-dark m-0">
                      Molestias officiis voluptates dignissimos magni iste
                      magnam.
                    </p>
                  </div>
                </div>
              </a>
              <hr className="m-0" />
              <a className="notification dropdown-item" href="#0">
                <div className="row m-0 p-0">
                  <div className="notificationDivImg col-2 m-0">
                    <img src="/images/Admin/dashboard.png" alt="..." />
                  </div>
                  <div className="col-10 m-auto pr-0 pl-2">
                    <p className="text-muted mb-2">Dashboard - Curso</p>
                    <p className="text-dark m-0">
                      Itaque quo ipsum veritatis ipsa. Atque, similique fuga.
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
                <a className="dropdown-item" href="#0">
                  Perfil
                </a>
                <a className="dropdown-item" href="#0">
                  Another action
                </a>
                <a className="dropdown-item" href="#0">
                  Something else here
                </a>
                <hr />
                <a
                  className="dropdown-item text-center text-danger p-0"
                  href="#0"
                >
                  logout
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
          data-target="#navbarVNavDropdown"
          aria-controls="navbarVNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <img src="/images/Admin/hamburguer-menu.png" alt="..." />
        </button>
      </div>
    </div>
  );
};

export { VerticalNav, HorizontalNav };
