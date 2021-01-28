const ClassLessonsNav = (props) => {
  return (
    <div>
      <nav className='navLesson nav flex-column'>
        {props.lessons.map((lesson) => {
          return (
            <a
              onClick={() => props.activeLesson({ id: lesson.moduleID + '_' + lesson.id, prefix: lesson.prefix })}
              key={lesson.moduleID + '_' + lesson.id}
              id={lesson.moduleID + '_' + lesson.id}
              className={'nav-link lesson'}
              href={'#' + lesson.name.toLowerCase()}
              data-toggle='collapse'
              data-target='#navbarVNavDropdown'
              aria-controls='navbarVNavDropdown'
              aria-expanded='false'
              role='tab'
              aria-selected='true'
            >
              {lesson.id.slice(-1) + '. ' + lesson.name.replaceAll('_', ' ')}
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default ClassLessonsNav;
