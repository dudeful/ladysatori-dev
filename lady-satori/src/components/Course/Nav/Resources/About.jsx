import DOMPurify from "dompurify";
import draftToHtml from "draftjs-to-html";

DOMPurify.addHook("afterSanitizeAttributes", function (node) {
  // set all elements owning target to target=_blank
  if ("target" in node) {
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener");
  }
});

const About = (props) => {
  return (
    <div
      className="tab-pane fade show active inactivate_tab"
      id="about"
      role="tabpanel"
      aria-labelledby="about-tab"
    >
      <div className="lesson_resources_about">
        {props.resources.about ? (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                draftToHtml(JSON.parse(props.resources.about.body)),
                {
                  ADD_TAGS: ["iframe"],
                }
              ),
            }}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default About;
