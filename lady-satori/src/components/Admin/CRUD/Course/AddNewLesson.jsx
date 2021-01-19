import { useState } from "react";
import DraftEditor from "./DraftEditor";
import axios from "axios";
import Course from "../../Course";
import Loading from "../../../Errors/Loading";

function AddNewLesson(props) {
  //
  const [loading, setLoading] = useState(false);

  const getInputs = (inputs) => {
    const sessionToken = sessionStorage.getItem("auth-token");
    const key = { key: "module_2/lesson_1" };

    const batchPost = new Promise((resolve, reject) => {
      setLoading(true);
      let i = 0;
      Array.from(inputs.video).forEach((segment) => {
        resolve(
          axios
            .post("http://localhost:5000/course", {
              key: segment.webkitRelativePath,
            })
            .then((res) => {
              let formData = new FormData();
              Object.entries(res.data.fields).forEach(([k, v]) => {
                formData.append(k, v);
              });
              formData.append("file", segment);
              return { formData: formData, url: res.data.url };
            })
            .then(async (data) => {
              await fetch(data.url, {
                method: "POST",
                body: data.formData,
              }).then(() => {
                i++;
                if (i === inputs.video.length) {
                  props.updateComponent({ component: Course });
                }
              });
            })
            .catch((err) => console.log(err))
        );
      });
    });

    batchPost
      .then(() => {
        axios
          .post(
            "http://localhost:5000/course/briefing",
            {
              briefing: inputs.briefing,
              key: key.key,
            },
            { headers: { sessionToken } }
          )
          .then((res) => {
            if (res.data.error) {
              console.log(res.data);
            } else if (res.data.success) {
              console.log(res.data);
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="addNewPost">
        <DraftEditor getInputs={getInputs} />
      </div>
    );
  }
}

export default AddNewLesson;
