import '../../../styles/ClassRoomNav.css';
import HorizontalNav from './HorizontalNav';
import VerticalNav from './VerticalNav';

const ClassRoomNav = (props) => {
  return (
    <div>
      <HorizontalNav />
      <VerticalNav currentLesson={props.currentLesson} modules={props.modules} lessons={props.lessons} />
    </div>
  );
};

export default ClassRoomNav;
