import { useState, useEffect } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/themes/material.css";
import NewLessonResources from "./NewLessonResources";
import BriefingDraftEditor from "./BriefingDraftEditor";

const NewLesson = (props) => {
  const [key, setKey] = useState({ module: "", lesson: "" });
  const [lessonID, setLessonID] = useState(null);
  const [moduleID, setModuleID] = useState(null);
  const [newModuleWarning, setNewModuleWarning] = useState(false);
  const [lessonExists, setLessonExists] = useState(false);
  const [video, setVideo] = useState("");
  const [briefing, setBriefing] = useState("");
  const [complements, setComplements] = useState({
    complement_1: {
      title: "",
      link: "",
    },
  });

  // --------------------- VALIDATION ----------------------
  const checkInputs = () => {
    if (briefing === "" || video === "") {
      return false;
    } else if (
      briefing.blocks.length === 1 &&
      briefing.blocks[0].text === "" &&
      briefing.blocks[1].text === "" &&
      briefing.blocks[2].text === "" &&
      briefing.blocks[3].text === "" &&
      briefing.blocks[4].text === ""
    ) {
      return false;
    } else if (key.module === "" || key.lesson === "") {
      return false;
    } else if (lessonExists) {
      return false;
    } else {
      return true;
    }
  };

  const validateLessonName = () => {
    if (key.module) {
      const newLessonName = key.lesson
        .trim()
        .toLowerCase()
        .replaceAll(" ", "_");

      const module = () => {
        if (props.existingModules[0]) {
          const module = props.existingModules.filter(
            (module) =>
              module.name.toLowerCase() ===
              key.module.trim().toLowerCase().replaceAll(" ", "_")
          );
          return module;
        } else {
          return false;
        }
      };

      if (module()[0]) {
        setNewModuleWarning(false);

        const lessons = props.existingLessons.filter(
          (lesson) => lesson.module === module()[0].id
        );

        setModuleID(module()[0].id);
        setLessonID(lessons.length + 1);

        const existingLessonsNames = lessons.map((l) => {
          return l.lesson.toLowerCase();
        });

        if (existingLessonsNames.includes(newLessonName)) {
          setLessonExists(true);
        } else {
          setLessonExists(false);
        }
      } else {
        setNewModuleWarning(true);
        setLessonExists(false);
        setModuleID("module_" + (props.existingModules.length + 1));
        setLessonID(1);
      }
    }
    moduleKeyHandler_Blur();
    lessonKeyHandler_Blur();
  };

  const fillModal = {
    duplicateName: {
      active: "modal",
      msg: {
        title: "Nome de Aula Duplicado!",
        body: (
          <div>
            <div>
              Parece que já existe uma aula com o nome que você escolheu
              &#129488;
            </div>
            <div className="mt-2">
              Dentro de um <b className="text-dark">mesmo módulo</b> as aulas
              devem possuir <b className="text-dark">nomes distintos</b>
            </div>
          </div>
        ),
      },
    },
    emptyFields: {
      active: "modal",
      msg: {
        title: "Existem campos vazios!",
        body: (
          <span>
            Parece que você esqueceu de preencher alguma coisa &#129488;
          </span>
        ),
      },
    },
    allGood: { active: "", msg: { title: "", body: "" } },
  };
  const [validationModal, setValidationModal] = useState(fillModal.emptyFields);

  //---------------------- INPUT HANDLERS ---------------------

  useEffect(() => {
    if (newModuleWarning) {
      document
        .getElementById("module_name_input")
        .classList.remove("text-info");
      document
        .getElementById("module_name_input")
        .classList.add("text-warning");
    } else {
      document
        .getElementById("module_name_input")
        .classList.remove("text-warning");
      document.getElementById("module_name_input").classList.add("text-info");
    }
  }, [newModuleWarning]);

  const moduleKeyHandler = (e) => {
    setKey((prevValue) => {
      return {
        ...prevValue,
        module: e.target.value,
      };
    });
  };

  const lessonKeyHandler = (e) => {
    setKey((prevValue) => {
      return {
        ...prevValue,
        lesson: e.target.value,
      };
    });
  };

  const moduleKeyHandler_Blur = () => {
    setKey((prevValue) => {
      return {
        ...prevValue,
        module: key.module.trim().replaceAll(" ", "_"),
      };
    });
  };

  const lessonKeyHandler_Blur = () => {
    setKey((prevValue) => {
      return {
        ...prevValue,
        lesson: key.lesson.trim().replaceAll(" ", "_"),
      };
    });
  };

  // ------------------- submit ---------------------
  const submit = () => {
    if (checkInputs() === true) {
      setValidationModal(fillModal.allGood);
      props.getInputs({
        key: key,
        module_id: moduleID,
        lesson_id: "lesson_" + lessonID,
        briefing: briefing,
        complements: complements,
        video: video,
      });
    } else if (lessonExists) {
      setValidationModal(fillModal.duplicateName);
    } else {
      setValidationModal(fillModal.emptyFields);
    }
  };

  const videoLesson = (e) => {
    if (e.target.value) {
      const inputFile = document.getElementById("input_file_name");
      inputFile.classList.remove("d-none");
      inputFile.innerHTML = e.target.value.split("\\").slice(-1)[0];

      const files = document.getElementById("inputGroupFile02").files;

      setVideo(files);
    } else {
      setVideo("");
      document.getElementById("input_file_name").classList.add("d-none");
    }
  };

  //---------------- RETURN ----------------
  return (
    <div>
      <div className="lesson_keys">
        <div className="input-group">
          <div className="input-group-prepend">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Módulo
            </button>
            <div className="dropdown-menu pt-3">
              {props.existingModules[0] ? (
                props.existingModules.map((module) => {
                  return (
                    <div
                      key={module.id}
                      onClick={() =>
                        setKey((prev) => {
                          return {
                            ...prev,
                            module: module.name,
                          };
                        })
                      }
                      onBlur={() => validateLessonName()}
                      className="text-left dropdown-item mb-2 pl-3"
                    >
                      <a
                        href="#0"
                        alt="..."
                        className="text-decoration-none text-dark"
                      >
                        {module.name.replaceAll("_", " ")}
                      </a>
                    </div>
                  );
                })
              ) : (
                <span className="p-3 text-info">nada aqui ainda :(</span>
              )}
            </div>
          </div>
          <Tippy
            theme="light"
            visible={newModuleWarning}
            content={
              <span className="text-info p-1">
                hmm.. parece que este será um novo módulo &#x1F920;
              </span>
            }
          >
            <input
              onChange={(e) => moduleKeyHandler(e)}
              onBlur={() => validateLessonName()}
              value={key.module.replaceAll("_", " ")}
              id="module_name_input"
              type="text"
              className="form-control text-info font-weight-bold foat-italic shadow-sm"
              aria-label="Text input with dropdown button"
              placeholder="novo módulo? digite aqui"
            />
          </Tippy>
        </div>
        <div className="input-group mt-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Aula
            </span>
          </div>
          <Tippy
            theme="material"
            visible={lessonExists}
            content={
              <span className="text-warning p-1">
                uma aula com este nome já existe &#129488;
              </span>
            }
          >
            <input
              onChange={(e) => lessonKeyHandler(e)}
              onBlur={() => validateLessonName()}
              value={key.lesson.replaceAll("_", " ")}
              type="text"
              className="form-control text-info shadow-sm"
              placeholder="Qual nome deseja dar para esta aula?"
              aria-label="Qual nome deseja dar para esta aula?"
              aria-describedby="basic-addon1"
            />
          </Tippy>
        </div>
      </div>
      <div className="video-lesson-input mt-0">
        <p>vídeo</p>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroupFileAddon02">
              Upload
            </span>
          </div>
          <div className="custom-file">
            <input
              onChange={videoLesson}
              type="file"
              multiple
              directory=""
              webkitdirectory=""
              mozdirectory=""
              className="custom-file-input"
              id="inputGroupFile02"
              aria-describedby="inputGroupFileAddon02"
            />
            <label className="custom-file-label" htmlFor="inputGroupFile02">
              {`Click ou Arraste o Video Aqui`}
            </label>
          </div>
        </div>
        <div
          id="input_file_name"
          className="d-none mt-3 font-italic text-info"
        />
      </div>

      <NewLessonResources
        setComplements={setComplements}
        complements={complements}
      />

      <BriefingDraftEditor
        setBriefing={setBriefing}
        validationModal={validationModal}
        submit={() => submit()}
      />
    </div>
  );
};

export default NewLesson;
