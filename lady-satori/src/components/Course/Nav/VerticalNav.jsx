import ClassModulesNav from './ClassModulesNav';
import ClassLessonsNav from './ClassLessonsNav';

const VerticalNav = (props) => {
  const activeModule = (module) => {
    const elementId = document.getElementById(module);
    if (elementId) {
      Array.from(document.getElementsByClassName('module')).forEach((el) => {
        el.classList.remove('active');
        el.classList.remove('font-italic');
      });
      elementId.classList.toggle('active');
      elementId.classList.add('font-italic');
      elementId.classList.toggle('navArrowTransition');
    }
  };

  const activeLesson = (lesson) => {
    const moduleID = lesson.prefix.split('/')[0];
    document.getElementById(moduleID).classList.toggle('navArrowTransition');
    activeModule(moduleID);

    const elementId = document.getElementById(lesson.id);
    if (elementId) {
      Array.from(document.getElementsByClassName('lesson')).forEach((el) => el.classList.remove('active'));
      elementId.classList.toggle('active');
    }
    props.currentLesson(lesson.prefix);
  };

  return (
    <div className='class_room_nav'>
      <div className='navbar-expand-md'>
        <div className='collapse navbar-collapse' id='navbarVNavDropdown'>
          <div className='v-navbar'>
            <hr className='mt-0' />
            <nav className='nav flex-column' role='tablist'>
              {props.modules.map((module) => {
                const lessons = props.lessons.filter((lesson) => lesson.moduleID === module.id);

                return (
                  <div key={module.id}>
                    <ClassModulesNav
                      module={module}
                      // icon={module.icon}
                      activeModule={activeModule}
                      // isActive={module.isActive}
                    />
                    <div className={'collapse ' + (module.id === 'module_1' ? 'show' : '')} id={module.id + '_child'}>
                      <ClassLessonsNav activeLesson={activeLesson} lessons={lessons} />
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalNav;
