import { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";
import PreviewModal from "./PreviewModal";
import { PostIncompleteModal } from "./PostIncompleteModal";

DOMPurify.addHook("afterSanitizeAttributes", function (node) {
  // set all elements owning target to target=_blank
  if ("target" in node) {
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener");
  }
});

const getHtml = (editorState) =>
  draftToHtml(convertToRaw(editorState.getCurrentContent()));

const DraftEditor = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // --------------------- handle inputs ---------------------
  const [briefing, setBriefing] = useState("");
  const [video, setVideo] = useState("");
  const [complements, setComplements] = useState({
    complement_1: {
      title: "",
      link: "",
    },
  });

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    setBriefing(convertToRaw(editorState.getCurrentContent()));
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

  ///////////////////--- DEAL WITH COMPLEMENTS ---/////////////////////
  const titleComplementHandler = (e) => {
    const { name, value } = e.target;
    const link = document.getElementById("link_" + name).value;

    setComplements((prevValue) => {
      return {
        ...prevValue,
        [name]: { title: value, link: link },
      };
    });
  };

  const linkComplementHandler = (e) => {
    const { name, value } = e.target;
    const title = document.getElementById("title_" + name).value;

    setComplements((prevValue) => {
      return {
        ...prevValue,
        [name]: { title: title, link: value },
      };
    });
  };

  //---------------------- add input -------------------------
  const addInput = () => {
    const i =
      document.getElementsByClassName("complements-inputs-child").length + 1;
    const inputs = document.getElementById("complements-inputs");

    //......................... add 'complement' object .........................
    setComplements((prevValue) => {
      const key = "complement_" + i;
      return {
        ...prevValue,
        [key]: { title: "", link: "" },
      };
    });

    //........................ clone and append node ...........................
    const node = document.getElementsByClassName("complements-inputs-child")[0];
    const newNode = node.cloneNode(true);
    newNode.classList.add("complement_" + i);
    inputs.appendChild(newNode);

    //.............. transform 'add' button into 'delete' buttom ................
    const lastBtn = inputs.getElementsByClassName("btn")[i - 1];
    lastBtn.classList.add("btn-outline-danger");
    lastBtn.getElementsByClassName("fas")[0].classList.remove("fa-plus-circle");
    lastBtn.getElementsByClassName("fas")[0].classList.add("fa-minus-circle");
    lastBtn.onclick = (e) => removeInput(e);

    //....................... setup input fields .........................
    const title_input = inputs.getElementsByClassName("form-control-title")[
      i - 1
    ];
    const link_input = inputs.getElementsByClassName("form-control-link")[
      i - 1
    ];

    title_input.value = "";
    link_input.value = "";
    title_input.id = "title_complement_" + i;
    link_input.id = "link_complement_" + i;
    title_input.name = "complement_" + i;
    link_input.name = "complement_" + i;
    title_input.onchange = (e) => titleComplementHandler(e);
    link_input.onchange = (e) => linkComplementHandler(e);
  };

  //---------------------- remove input ----------------------
  const removeInput = (e) => {
    const parentNode = e.currentTarget.parentNode.parentNode;
    const parentClass = parentNode.classList[parentNode.classList.length - 1];
    parentNode.classList.add("d-none");

    setComplements((prevValue) => {
      return {
        ...prevValue,
        [parentClass]: undefined,
      };
    });
  };
  ////////////////////////////////////////////////////////////////

  // --------------------- check inputs ----------------------
  const checkInputs = () => {
    if (briefing === "" || video === "") {
      return false;
    } else if (
      briefing.blocks.length === 1 &&
      briefing.blocks[0].text === "" &&
      briefing.blocks[1].text === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  // ------------------- submit ---------------------

  const [emptyModal, setEmptyModal] = useState("modal");

  const submit = () => {
    if (checkInputs() === true) {
      setEmptyModal("");
      props.getInputs({
        briefing: briefing,
        complements: complements,
        video: video,
      });
    } else {
      setEmptyModal("modal");
    }
  };

  // --------------------- confirm alert ---------------------

  window.addEventListener("beforeunload", (event) => {
    // Cancel the event as stated by the standard.
    event.preventDefault();
    // Older browsers supported custom message
    event.returnValue = false;
  });

  //-------------------- return ---------------------

  return (
    <div className="draftEditor">
      <div className="video-lesson-input">
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
      <div className="complements">
        <p>complementos</p>
        <div id="complements-inputs" className="p-0 complements-inputs">
          <div className="complements-inputs-child input-group input-group-sm mb-2 row m-0">
            <input
              onChange={(e) => titleComplementHandler(e)}
              name="complement_1"
              value={complements.complement_1.title}
              id="title_complement_1"
              type="text"
              className="form-control form-control-title col-4"
              aria-label="complement-title"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="título"
            />
            <input
              onChange={(e) => linkComplementHandler(e)}
              name="complement_1"
              value={complements.complement_1.link}
              id="link_complement_1"
              type="text"
              className="form-control form-control-link col-sm-7 col-6"
              aria-label="complement-link"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="link"
            />
            <div className="input-group-append col-sm-1 col-2 p-0">
              <button
                onClick={addInput}
                className="btn btn-sm btn-outline-info"
              >
                <i className="fas fa-plus-circle m-0 p-0"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      &nbsp;
      <div className="inner-draftEditor">
        <Editor
          editorState={editorState}
          wrapperClassName="rich-editor demo-wrapper"
          editorClassName="demo-editor"
          toolbarClassName="draftEditor-toolbar"
          onEditorStateChange={onEditorStateChange}
          placeholder="Toda boa aula começa com um bom briefing..."
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "list",
              "textAlign",
              "colorPicker",
              "link",
              "embedded",
              "emoji",
              "image",
              "history",
            ],
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            colorPicker: {
              className: undefined,
              component: undefined,
              popupClassName: undefined,
              colors: [
                "rgb(0,0,0,0)",
                "rgb(0,0,0)",
                "rgb(97,189,109)",
                "rgb(26,188,156)",
                "rgb(84,172,210)",
                "rgb(44,130,201)",
                "rgb(147,101,184)",
                "rgb(71,85,119)",
                "rgb(204,204,204)",
                "rgb(65,168,95)",
                "rgb(0,168,133)",
                "rgb(61,142,185)",
                "rgb(41,105,176)",
                "rgb(85,57,130)",
                "rgb(40,50,78)",
                "rgb(247,218,100)",
                "rgb(251,160,38)",
                "rgb(235,107,86)",
                "rgb(226,80,65)",
                "rgb(163,143,132)",
                "rgb(239,239,239)",
                "rgb(255,255,255)",
                "rgb(250,197,28)",
                "rgb(243,121,52)",
                "rgb(209,72,65)",
                "rgb(184,49,47)",
                "rgb(124,112,107)",
                "rgb(209,213,216)",
              ],
            },
          }}
        />
      </div>
      <div className="text-center mb-5 pb-5">
        <button
          className="btn btn-success"
          data-toggle="modal"
          data-target="#previewModalLesson"
        >
          Preview Briefing
        </button>
        <button
          onClick={submit}
          type="button"
          data-toggle={emptyModal}
          data-target="#postIncompleteLessonModal"
          className="btn btn-outline-success ml-3"
        >
          PUBLICAR
        </button>
      </div>
      <PreviewModal body={DOMPurify.sanitize(getHtml(editorState))} />
      <PostIncompleteModal />
    </div>
  );
};

export default DraftEditor;
