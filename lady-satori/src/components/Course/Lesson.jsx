import "../../styles/Lesson.css";
import { useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import LessonResourcesNav from "./Nav/Resources/LessonResourcesNav";

const Lesson = (props) => {
  const player = useRef();

  const resume = () => player.current.seekTo(29);

  useEffect(() => {
    player.current.showPreview();
  }, [props.lessonURL.thumbnail]);

  return (
    <div>
      <div className="react_player">
        <ReactPlayer
          onStart={() => resume()}
          ref={player}
          className="bg-dark"
          width={"100%"}
          height={"100%"}
          controls
          url={props.lessonURL.video}
          light={props.lessonURL.thumbnail}
        />
      </div>

      <div className={!props.adminPanel ? "d-none" : "m-2 text-right"}>
        <button
          onClick={() => props.editLesson(props.resources)}
          className="btn btn-warning btn-sm"
        >
          <b>editar</b>
        </button>
      </div>

      <div className="lesson_resources">
        <LessonResourcesNav
          adminPanel={props.adminPanel}
          answerQuestion={props.answerQuestion}
          intro={props.lessonURL.intro}
          active={props.lessonURL.active}
          resources={props.resources}
          fetchQuestions={props.fetchQuestions}
        />
      </div>
    </div>
  );
};

export default Lesson;
