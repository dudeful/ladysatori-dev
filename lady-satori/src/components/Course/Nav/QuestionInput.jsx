import { useState } from "react";
import axios from "axios";
import Tippy from "@tippyjs/react";

const QuestionInput = (props) => {
  const [question, setQuestion] = useState({ title: "", body: "" });

  const questionHandler = (e) => {
    const { name, value } = e.target;

    setQuestion((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitQuestion = () => {
    //
    const authToken = () => {
      if (localStorage.getItem("auth-token")) {
        return localStorage.getItem("auth-token");
      } else if (sessionStorage.getItem("auth-token")) {
        return sessionStorage.getItem("auth-token");
      } else {
        return false;
      }
    };

    if (!question.title) {
      alert("Você precisa dar um título a sua pergunta");
    } else if (!question.body) {
      alert("Por favor elabore um pouco sobre sua dúvida");
    } else {
      axios
        .post(
          // 'https://lf2j6ejxq7.execute-api.sa-east-1.amazonaws.com/test/course/resources/submit-question',
          "http://localhost:5000/course/resources/submit-question",
          { question: question, prefix: props.prefix },
          {
            headers: { Authorization: authToken() },
          }
        )
        .then((res) => {
          if (res.data.isLoggedIn === false || res.data.isTokenOk === false) {
            alert("você precisa estar logado para realizar esta operação");
          } else if (res.data.error === true) {
            alert(
              "Oops! Parece que tivemos um erro com seu pedido, por favor tente novamente"
            );
          } else {
            console.log({ success: true });
            setQuestion({ title: "", body: "" });
            document
              .getElementById("question-input")
              .classList.toggle("d-none");
            props.fetchQuestions(props.prefix);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="mt-5 question-input">
      <div
        onClick={() =>
          document.getElementById("question-input").classList.toggle("d-none")
        }
        className="head-btn mb-2"
      >
        <button className="btn btn-sm p-2 w-100">
          <span className="h5 text-muted">Tem alguma dúvida? Pergunte! 🙋</span>
        </button>
      </div>
      <div id="question-input" className="d-none p-3">
        <div className="mb-3">
          <Tippy
            theme="light"
            content={
              <span className="pt-3 pb-3 text-dark">
                <i className="font-weight-bold">Exemplo:</i> "É comum dor no
                quadril ao fazer a posição apresentada aos{" "}
                <b className="text-primary">12:34</b>?"
              </span>
            }
          >
            <input
              onChange={(e) => questionHandler(e)}
              value={question.title}
              name="title"
              type="text"
              className="form-control"
              id="question-input-form-control"
              placeholder="Título"
            />
          </Tippy>
        </div>
        <div className="mb-3">
          <textarea
            onChange={(e) => questionHandler(e)}
            value={question.body}
            name="body"
            className="form-control"
            id="question-textarea-form-control"
            rows="3"
            placeholder="Elabore sua pergunta aqui..."
          ></textarea>
        </div>
        <div className="text-right">
          <button
            onClick={() => submitQuestion()}
            className="btn btn-sm btn-outline-success w-25"
          >
            <span className="h6">enviar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionInput;
