import React from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";
import ImageUploading from "react-images-uploading";
import AvatarEditor from "react-avatar-editor";
import { PreviewModal } from "./PreviewModal";
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

function UpdateDraftEditor(props) {
  //

  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(
      convertFromRaw(JSON.parse(props.postData.body))
    )
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    setPostInput((prevValue) => {
      return {
        ...prevValue,
        body: convertToRaw(editorState.getCurrentContent()),
      };
    });
  };

  // ----------------- react image uploading -----------------

  const [images, setImages] = React.useState([]);

  const onImageChange = (imageList) => {
    setImages(imageList);
  };

  const imageRemove = () => {
    setPostInput((prevValue) => {
      return {
        ...prevValue,
        coverImg: "",
      };
    });
  };

  // --------------------- handle inputs ---------------------

  const [postInput, setPostInput] = React.useState({
    id: props.postData.id,
    key: props.postData.key,
    updateDate: new Date().toLocaleString("pt-BR"),
    date: props.postData.date,
    coverImg: props.postData.coverImg,
    tag: props.postData.tag,
    title: props.postData.title,
    body: JSON.parse(props.postData.body),
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setPostInput((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  // --------------------- confirm alert ---------------------

  function beforeUnload(event) {
    // Cancel the event as stated by the standard.
    event.preventDefault();
    // Older browsers supported custom message
    event.returnValue = false;
  }

  window.addEventListener("beforeunload", beforeUnload);

  // --------------------- get canvas ------------------------

  const myRef = React.useRef(null);

  const onCanvasSave = () => {
    const canvas = myRef.current.getImage();
    var dataURL = canvas.toDataURL();
    setPostInput((prevValue) => {
      return {
        ...prevValue,
        coverImg: dataURL,
      };
    });
  };

  // --------------------- check inputs ----------------------

  const checkInputs = () => {
    if (
      postInput.coverImg === "" ||
      postInput.tag === "" ||
      postInput.title === "" ||
      postInput.body === ""
    ) {
      return false;
    } else if (
      postInput.body.blocks.length === 1 &&
      postInput.body.blocks[0].text === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  // ------------------- submit post ------------------

  const [emptyModal, setEmptyModal] = React.useState("modal");

  const submitPost = () => {
    if (checkInputs() === true) {
      setEmptyModal("");
      props.getPostInputs(postInput);
    } else {
      setEmptyModal("modal");
    }
  };

  return (
    <div className="drafEditor">
      <div className="title-coverImg">
        <ImageUploading
          value={images}
          onChange={onImageChange}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI

            <div className="upload__image-wrapper">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupFileAddon01">
                    Upload
                  </span>
                </div>
                <div className="custom-file">
                  <button
                    onClick={onImageUpload}
                    {...dragProps}
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                  />
                  <label
                    style={isDragging ? { color: "red" } : undefined}
                    className="custom-file-label"
                    htmlFor="inputGroupFile01"
                  >
                    {`Click ou Arraste a Imagem Aqui`}
                  </label>
                </div>
              </div>
              &nbsp;
              {imageList.map((image, index) => (
                <div key={index} className="image-item mb-5">
                  <AvatarEditor
                    ref={myRef}
                    image={image["data_url"]}
                    width={967}
                    height={204}
                    color={[255, 255, 255, 0.6]} // RGBA
                    scale={1}
                    rotate={0}
                    onMouseUp={onCanvasSave}
                    onImageReady={onCanvasSave}
                  />
                  <div>
                    <button
                      className="btn btn-danger mt-2"
                      onClick={() => {
                        onImageRemove(index);
                        imageRemove();
                      }}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              #
            </span>
          </div>
          <input
            onChange={handleInputChange}
            value={postInput.tag}
            name="tag"
            type="text"
            className="form-control"
            placeholder="tag"
            aria-label="tag"
            aria-describedby="basic-addon1"
          />
        </div>

        <div className="input-group mb-3">
          <input
            onChange={handleInputChange}
            value={postInput.title}
            type="text"
            name="title"
            placeholder="Título"
            className="form-control"
            aria-label="title"
            aria-describedby="basic-addon1"
            required
          />
        </div>
      </div>
      <div className="inner-draftEditor">
        <Editor
          editorState={editorState}
          wrapperClassName="rich-editor demo-wrapper"
          editorClassName="demo-editor"
          toolbarClassName="draftEditor-toolbar"
          onEditorStateChange={onEditorStateChange}
          placeholder="Comece a mudar o mundo hoje, uma palavra por vez..."
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
      <div className="underlyingHtml">
        {/* <h4>Underlying HTML</h4>
        <div className="html-view">{getHtml(editorState)}</div> */}
        <button
          className="btn btn-success"
          data-toggle="modal"
          data-target="#previewModal"
        >
          Preview Post
        </button>
        <button
          onClick={submitPost}
          type="button"
          data-toggle={emptyModal}
          data-target="#postIncompleteModal"
          className="btn btn-outline-success ml-3"
        >
          PUBLICAR
        </button>
      </div>
      <PreviewModal
        output={{
          coverImg: postInput.coverImg,
          tag: postInput.tag,
          title: postInput.title,
          body: DOMPurify.sanitize(getHtml(editorState)),
        }}
      />
      <PostIncompleteModal />
    </div>
  );
}

export default UpdateDraftEditor;
