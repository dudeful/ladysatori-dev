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
      <ClassRoom adminPanel={true} editLesson={editLesson} />
    </div>
  );
};

export default Course;
