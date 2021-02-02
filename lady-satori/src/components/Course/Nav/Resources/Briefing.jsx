import DOMPurify from "dompurify";
import draftToHtml from "draftjs-to-html";

DOMPurify.addHook("afterSanitizeAttributes", function (node) {
  // set all elements owning target to target=_blank
  if ("target" in node) {
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener");
  }
});

const Briefing = (props) => {
  return (
    <div
      className="tab-pane fade show active"
      id="briefing"
      role="tabpanel"
      aria-labelledby="briefing-tab"
    >
      {props.resources.briefing ? (
        <div>
          <h5 className="text-muted">Sobre esta aula</h5>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                draftToHtml(JSON.parse(props.resources.briefing.body)),
                {
                  ADD_TAGS: ["iframe"],
                }
              ),
            }}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Briefing;
