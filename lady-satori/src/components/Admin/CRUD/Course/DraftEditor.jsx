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

  // --------------------- confirm alert ---------------------

  window.addEventListener("beforeunload", (event) => {
    // Cancel the event as stated by the standard.
    event.preventDefault();
    // Older browsers supported custom message
    event.returnValue = false;
  });

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
      props.getInputs({ briefing: briefing, video: video });
    } else {
      setEmptyModal("modal");
    }
  };

  //-------------------- return ---------------------

  return (
    <div className="draftEditor">
      <div className="video-lesson-input">
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
