import ClassRoom from "../Course/ClassRoom";
import UpdateLesson from "./CRUD/Course/Update/UpdateLesson";

const Course = (props) => {
  const editLesson = (resources) => {
    console.log(resources);
    props.updateComponent({
      component: UpdateLesson,
      id: "admin_Course",
      props: { resources: resources },
    });
  };

  return (
    <div className="course-admin">
      <div className="arrow-menu col p-0">
        <button
          onClick={() => {
            document
              .getElementById("menu_course_admin_img")
              .parentNode.parentNode.classList.toggle("transition_rotation");
          }}
          className="navbar-toggler border-0 m-0 pr-2 pl-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarVNavDropdown_course"
          aria-controls="navbarVNavDropdown_course"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <img
            id="menu_course_admin_img"
            src="/images/ClassRoom/hideNavArrow.png"
            alt="..."
          />
        </button>
      </div>

      <ClassRoom adminPanel={true} editLesson={editLesson} />
    </div>
  );
};

export default Course;
