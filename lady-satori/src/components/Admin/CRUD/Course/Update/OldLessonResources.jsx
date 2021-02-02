import { indexOf } from "lodash";

const OldLessonResources = (props) => {
  ///////////////////--- DEAL WITH COMPLEMENTS ---/////////////////////
  const titleComplementHandler = (e) => {
    const { name, value } = e.target;
    const link = document.getElementById("link_" + name).value;

    props.setComplements((prevValue) => {
      return {
        ...prevValue,
        [name]: { title: value, link: link },
      };
    });
  };

  const linkComplementHandler = (e) => {
    const { name, value } = e.target;
    const title = document.getElementById("title_" + name).value;

    props.setComplements((prevValue) => {
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

    //add 'complement' object
    props.setComplements((prevValue) => {
      const key = "complement_" + i;
      return {
        ...prevValue,
        [key]: { title: "", link: "" },
      };
    });

    //clone and append node
    const node = document.getElementsByClassName("complements-inputs-child")[0];
    const newNode = node.cloneNode(true);
    newNode.classList.add("complement_" + i);
    inputs.appendChild(newNode);

    //transform 'add' button into 'delete' buttom
    const lastBtn = inputs.getElementsByClassName("btn")[i - 1];
    lastBtn.classList.add("btn-outline-danger");
    lastBtn.getElementsByClassName("fas")[0].classList.remove("fa-plus-circle");
    lastBtn.getElementsByClassName("fas")[0].classList.add("fa-minus-circle");
    lastBtn.onclick = (e) => removeInput(e);

    //setup input fields
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

    props.setComplements((prevValue) => {
      return {
        ...prevValue,
        [parentClass]: undefined,
      };
    });
  };

  return (
    <div>
      <div className="complements">
        <p>complementos</p>
        <div id="complements-inputs" className="p-0 complements-inputs">
          {props.resources.complements.body.map((complement) => {
            const index =
              indexOf(props.resources.complements.body, complement) + 1;
            return (
              <div
                key={complement.title + complement.link}
                className="complements-inputs-child input-group input-group-sm mb-2 row m-0"
              >
                <input
                  onChange={(e) => titleComplementHandler(e)}
                  name={"complement_" + index}
                  value={
                    props.complements["complement_" + index]
                      ? props.complements["complement_" + index].title
                      : ""
                  }
                  id={"title_complement_" + index}
                  type="text"
                  className="form-control form-control-title col-4"
                  aria-label="complement-title"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="título"
                />
                <input
                  onChange={(e) => linkComplementHandler(e)}
                  name={"complement_" + index}
                  value={
                    props.complements["complement_" + index]
                      ? props.complements["complement_" + index].link
                      : ""
                  }
                  id={"link_complement_" + index}
                  type="text"
                  className="form-control form-control-link col-sm-7 col-6"
                  aria-label="complement-link"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="link"
                />
                <div className="input-group-append col-sm-1 col-2 p-0">
                  <button
                    onClick={index === 1 ? addInput : removeInput}
                    className={
                      "btn btn-sm " +
                      (index === 1 ? "btn-outline-info" : "btn-outline-danger")
                    }
                  >
                    <i
                      className={
                        "fas m-0 p-0 " +
                        (index === 1 ? "fa-plus-circle" : "fa-minus-circle")
                      }
                    ></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OldLessonResources;
