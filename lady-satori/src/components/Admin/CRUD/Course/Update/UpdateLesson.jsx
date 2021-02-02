import { useState } from "react";
import OldLesson from "../Update/OldLesson";
import axios from "axios";
import Course from "../../../Course";
import Loading from "../../../../Errors/Loading";

function UpdateLesson(props) {
  //
  const [loading, setLoading] = useState(false);

  const getInputs = (inputs) => {
    const sessionToken = sessionStorage.getItem("auth-token");

    const batchPost = new Promise((resolve, reject) => {
      let i = 0;

      axios
        .get(
          "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/admin/auth/isLoggedIn",
          // "http://localhost:5000/admin/auth/isLoggedIn",
          {
            headers: { Authorization: sessionToken },
          }
        )
        .then((res) => {
          if (res.data.isLoggedIn === false || res.data.isTokenOk === false) {
            alert("você precisa estar logado para realizar esta operação");
          } else if (res.data.error === true) {
            alert(
              "Oops! Parece que tivemos um erro com seu pedido, por favor tente novamente"
            );
          } else if (inputs.video) {
            Array.from(inputs.video).forEach((segment) => {
              setLoading(true);
              resolve(
                axios
                  .post(
                    "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/course/video",
                    // "http://localhost:5000/course/video",
                    {
                      keys: {
                        prefix: props.props.resources.prefix,
                        video: segment.webkitRelativePath,
                      },
                    }
                  )
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
                        props.updateComponent({
                          component: Course,
                          id: "admin_Course",
                        });
                      }
                    });
                  })
                  .catch((err) => console.log(err))
              );
            });
          }
        })
        .catch((err) => console.log(err));
    });

    batchPost
      .then(() => {
        const resources = {
          prefix: props.props.resources.prefix,
          briefing: inputs.briefing,
          complements: inputs.complements,
        };

        return resources;
      })
      .then((resources) => {
        axios
          .post(
            "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/course/resources",
            // "http://localhost:5000/course/resources",
            resources,
            {
              headers: { Authorization: sessionToken },
            }
          )
          .then((res) => {
            if (res.data.error) {
              console.log(res.data);
              if (res.data.msg === "lesson name is duplicate") {
                alert(
                  "Uma aula com este nome já existe, por favor escolha outro nome"
                );
              }
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
        <OldLesson getInputs={getInputs} resources={props.props.resources} />
      </div>
    );
  }
}

export default UpdateLesson;
