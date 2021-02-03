import Questions from "./Questions";
import Complements from "./Complements";
import Briefing from "./Briefing";
import About from "./About";

const LessonResourcesNav = (props) => {
  return (
    <div>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className={"nav-link active " + props.intro}
            id="briefing-tab"
            data-toggle="tab"
            href="#briefing"
            role="tab"
            aria-controls="briefing"
            aria-selected="true"
          >
            Briefing
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={"nav-link inactivate_tab " + props.intro}
            id="questions-tab"
            data-toggle="tab"
            href="#questions"
            role="tab"
            aria-controls="questions"
            aria-selected="false"
          >
            Q&amp;A
          </a>
        </li>
        <li className="nav-item dropdown" role="presentation">
          <a
            className={"nav-link inactivate_tab dropdown-toggle " + props.intro}
            data-toggle="dropdown"
            href="#0"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Complementos
          </a>
          <div className="dropdown-menu">
            <a
              className="dropdown-item inactivate_tab"
              id="complements-tab1"
              data-toggle="tab"
              href="#complements1"
              role="tab"
              aria-controls="complements1"
              aria-selected="false"
            >
              desta aula
            </a>
            <div className="dropdown-divider"></div>
            <a
              className="dropdown-item inactivate_tab"
              id="complements-tab2"
              data-toggle="tab"
              href="#complements2"
              role="tab"
              aria-controls="complements2"
              aria-selected="false"
            >
              todos
            </a>
          </div>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={"nav-link inactivate_tab " + props.active}
            id="about-tab"
            data-toggle="tab"
            href="#about"
            role="tab"
            aria-controls="about"
            aria-selected="false"
          >
            Sobre o Curso
          </a>
        </li>
      </ul>

      <div className="tab-content" id="myTabContent">
        <Briefing resources={props.resources} />

        <Questions
          fetchQuestions={props.fetchQuestions}
          resources={props.resources}
          intro={props.intro}
          adminPanel={props.adminPanel}
          answerQuestion={props.answerQuestion}
        />

        <div
          className="tab-pane fade inactivate_tab"
          id="complements1"
          role="tabpanel"
          aria-labelledby="complements-tab1"
        >
          <Complements.LessonComplements resources={props.resources} />
        </div>

        <div
          className="tab-pane fade inactivate_tab"
          id="complements2"
          role="tabpanel"
          aria-labelledby="complements-tab2"
        >
          <Complements.AllComplements resources={props.resources} />
        </div>

        <About resources={props.resources} />
      </div>
    </div>
  );
};

export default LessonResourcesNav;
