import { useState, useEffect } from "react";
import Loading from "../../../../Errors/Loading";
import OldLessonResources from "./OldLessonResources";
import BriefingDraftEditor from "./BriefingDraftEditor";

const OldLesson = (props) => {
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState("");
  const [briefing, setBriefing] = useState("");
  const [complements, setComplements] = useState("");

  useEffect(() => {
    let k = 0;

    props.resources.complements.body.forEach((complement) => {
      setComplements((prev) => {
        k++;
        if (props.resources.complements.body.length === k) {
          setLoading(false);
        }

        return {
          ...prev,
          ["complement_" + k]: complement,
        };
      });
    });
  }, [props.resources]);

  // --------------------- VALIDATION ----------------------
  const checkInputs = () => {
    if (briefing === "") {
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
    } else {
      return true;
    }
  };

  const fillModal = {
    emptyFields: {
      active: "modal",
      msg: {
        title: "Existem campos vazios!",
        body: (
          <span>
            Parece que você esqueceu de preencher o Briefing &#129488;
          </span>
        ),
      },
    },
    allGood: { active: "", msg: { title: "", body: "" } },
  };
  const [validationModal, setValidationModal] = useState(fillModal.emptyFields);

  // ------------------- submit ---------------------
  const submit = () => {
    if (checkInputs() === true) {
      setValidationModal(fillModal.allGood);
      props.getInputs({
        briefing: briefing,
        complements: complements,
        video: video,
      });
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

  if (loading) {
    return <Loading />;
  } else {
    //---------------- RETURN ----------------
    return (
      <div>
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

        <OldLessonResources
          setComplements={setComplements}
          complements={complements}
          resources={props.resources}
        />

        <BriefingDraftEditor
          resources={props.resources}
          setBriefing={setBriefing}
          validationModal={validationModal}
          submit={() => submit()}
        />
      </div>
    );
  }
};

export default OldLesson;
