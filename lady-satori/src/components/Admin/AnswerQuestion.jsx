import "tippy.js/dist/tippy.css";
import "tippy.js/themes/material.css";
import "tippy.js/themes/light.css";
import Tippy from "@tippyjs/react";
import { useState, useEffect } from "react";
import axios from "axios";
import ConfirmBox from "./ConfirmBox";

const AnswerQuestion = (props) => {
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (props.question.answer) {
      setAnswer(props.question.answer.body);
    }
  }, [props.question.answer]);

  const deleteAnswer = () => {
    axios
      .post(
        "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/course/resources/delete-answer",
        // "http://localhost:5000/course/resources/delete-answer",
        { deleteAnswer: true, question: props.question },
        { headers: { Authorization: sessionStorage.getItem("auth-token") } }
      )
      .then((res) => {
        if (res.data.success) {
          console.log({ success: true });
          setAnswer("");
          alert("Pergunta removida com sucesso!");

          setTimeout(() => {
            props.fetchQuestions(props.prefix);
          }, 3000);
        } else {
          console.log({ success: false });
          alert(
            "oops! parece que tivemos algum imprevisto, por favor tente novamente."
          );
        }
      })
      .catch((err) => {
        console.log(err);
        alert(
          "oops! parece que tivemos algum imprevisto, por favor tente novamente."
        );
      });
  };

  const submitAnswer = () => {
    if (!answer) {
      alert("Hmmm, parece que você esqueceu da resposta.");
    } else {
      axios
        .post(
          "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/course/resources/submit-answer",
          // "http://localhost:5000/course/resources/submit-answer",
          { answer: answer, question: props.question },
          { headers: { Authorization: sessionStorage.getItem("auth-token") } }
        )
        .then((res) => {
          if (res.data.success) {
            console.log({ success: true });
            setAnswer("");
            alert(
              "Pergunta respondida com sucesso! Sua resposta pode levar alguns segundos para ser propagada"
            );

            setTimeout(() => {
              props.fetchQuestions(props.prefix);
            }, 3000);
          } else {
            console.log({ success: false });
            alert(
              "oops! parece que tivemos algum imprevisto, por favor tente novamente."
            );
          }
        })
        .catch((err) => {
          console.log(err);
          alert(
            "oops! parece que tivemos algum imprevisto, por favor tente novamente."
          );
        });
    }
  };

  return (
    <div
      className="modal fade"
      id="answerQuestionModal"
      tabIndex="-1"
      aria-labelledby="exampleAnswerQuestionModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title text-success"
              id="exampleAnswerQuestionModal"
            >
              {props.question.answer
                ? "Atualizar Resposta"
                : "Responder Pergunta"}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <textarea
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
                name="answer"
                className="form-control"
                id="answer-textarea-form-control"
                rows="3"
                placeholder="Elabore sua resposta aqui..."
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button
              // onClick={() => setAnswer("")}
              type="button"
              className="btn btn-sm btn-outline-secondary"
              data-dismiss="modal"
            >
              Cancelar
            </button>
            {props.question.answer ? (
              <Tippy
                theme="material"
                content={
                  <div className="text-warning pt-2 pb-2">
                    <h6>Deseja deletar a resposta existente?</h6>
                  </div>
                }
              >
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  data-toggle="modal"
                  data-target="#confirmBoxModal"
                >
                  Deletar
                </button>
              </Tippy>
            ) : (
              ""
            )}
            <button
              onClick={() => submitAnswer()}
              type="button"
              className="btn btn-sm btn-success"
              data-dismiss="modal"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
      <ConfirmBox
        modalBody={"Você realmente deseja deletar a resposta atual?"}
        confirm={deleteAnswer}
      />
    </div>
  );
};

export default AnswerQuestion;
