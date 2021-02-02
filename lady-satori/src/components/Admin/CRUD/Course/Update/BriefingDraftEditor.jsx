import { useState } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";
import PreviewModal from "../PreviewModal";
import { PostIncompleteModal } from "../PostIncompleteModal";

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
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      convertFromRaw(JSON.parse(props.resources.briefing.body))
    )
  );

  // --------------------- handle inputs ---------------------

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    props.setBriefing(convertToRaw(editorState.getCurrentContent()));
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
    <div className="draftEditor mt-5">
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
          onClick={props.submit}
          type="button"
          data-toggle={props.validationModal.active}
          data-target="#postIncompleteLessonModal"
          className="btn btn-outline-success ml-3"
        >
          PUBLICAR
        </button>
      </div>
      <PreviewModal body={DOMPurify.sanitize(getHtml(editorState))} />
      <PostIncompleteModal msg={props.validationModal.msg} />
    </div>
  );
};

export default DraftEditor;
