import { useState } from "react";
import DraftEditor from "./DraftEditor";
import axios from "axios";
// import Course from "../../Course";
import Loading from "../../../Errors/Loading";

function AddNewLesson(props) {
  //
  const [loading, setLoading] = useState(false);

  const getInputs = (inputs) => {
    // const sessionToken = sessionStorage.getItem("auth-token");
    // const key = { key: "module_2/lesson_1" };
    setLoading(true);

    // axios
    //   .post("http://localhost:5000/course/getPresignedPost", key, {
    //     headers: { sessionToken },
    //   })
    //   .then((res) => {
    //     if (res.data.isLoggedIn === false || res.data.isTokenOk === false) {
    //       alert("você precisa estar logado para realizar esta operação");
    //       window.location.reload();
    //     } else if (res.data.error === true) {
    //       console.log(res.data);
    //       alert(
    //         "Oops! Parece que tivemos um erro com seu pedido, por favor tente novamente"
    //       );
    //       return;
    //     } else {
    //       return res.data;
    //     }
    //   })
    //   .then((data) => {
    //preparing the data in a form for being sent to s3 (required by the createPresignedPost method)
    // let formData = new FormData();
    // Object.entries(res.data.fields).forEach(([k, v]) => {
    //   formData.append(k, v);
    // });
    // for (let i = 0; i < inputs.video.length; i++) {
    //   let file = inputs.video[i];
    //   console.log(inputs.video[i]);
    //   let fileParamName = `file${i}`;
    //   // let filePathParamName = `filepath${i}`;
    //   formData.append(fileParamName, file);
    //   // formData.append(filePathParamName, file.webkitRelativePath);
    // }
    // formData.append("file[1]", inputs.video[1]);
    // let i = 0;

    // let formData = new FormData();
    // Object.entries(res.data.fields).forEach(([k, v]) => {
    //   formData.append(k, v);
    // });
    // formData.append(`file`, f);

    Array.from(inputs.video).forEach((f) => {
      console.log(f);
      axios
        .post("http://localhost:5000/course", {
          key: f.webkitRelativePath,
        })
        .then((res) => {
          console.log(res.data);
          let formData = new FormData();
          Object.entries(res.data.fields).forEach(([k, v]) => {
            formData.append(k, v);
          });
          formData.append(`file`, f);
          return { formData: formData, url: res.data.url };
        })
        .then(async (data) => {
          await fetch(data.url, {
            method: "POST",
            body: data.formData,
          });
        })
        .catch((err) => console.log(err));
    });

    //   return { formData: formData, url: data.url };
    // })
    // .then(async (data) => {
    //   console.log(data.formData);
    //   //posting the form data to s3 bucket using pre-signed url
    //   await fetch(data.url, {
    //     method: "POST",
    //     body: data.formData,
    //   })
    //     .then(() => {
    //       // props.updateComponent({ component: Course });
    //     })
    //     .catch((err) => console.log(err));
    // })
    // .then(() => {
    //   axios
    //     .post(
    //       "http://localhost:5000/course/briefing",
    //       {
    //         briefing: inputs.briefing,
    //         key: key.key,
    //       },
    //       { headers: { sessionToken } }
    //     )
    //     .then((res) => {
    //       if (res.data.error) {
    //         console.log(res.data);
    //       } else if (res.data.success) {
    //         console.log(res.data);
    //       }
    //     })
    //     .catch((err) => console.log(err));
    // })
    // .catch((err) => console.log(err));
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
