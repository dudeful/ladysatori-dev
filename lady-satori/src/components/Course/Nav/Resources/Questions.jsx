import "tippy.js/dist/tippy.css";
import "tippy.js/themes/material.css";
import "tippy.js/themes/light.css";
import { useState } from "react";
import Tippy from "@tippyjs/react";
import QuestionInput from "./QuestionInput";
import UpdateQuestion from "./UpdateQuestion";
import ConfirmBox from "./ConfirmBox";
import date from "./DateCalculator";
import axios from "axios";

const colors = [
  { bg: "bg-dark", text: "text-light" },
  { bg: "bg-dark", text: "text-secondary" },
  { bg: "bg-dark", text: "text-danger" },
  { bg: "bg-dark", text: "text-warning" },
  { bg: "bg-success", text: "text-light" },
  { bg: "bg-success", text: "text-dark" },
  { bg: "bg-success", text: "text-danger" },
  { bg: "bg-secondary", text: "text-dark" },
  { bg: "bg-secondary", text: "text-danger" },
  { bg: "bg-secondary", text: "text-warning" },
  { bg: "bg-secondary", text: "text-info" },
  { bg: "bg-info", text: "text-light" },
  { bg: "bg-info", text: "text-dark" },
  { bg: "bg-info", text: "text-danger" },
  { bg: "bg-info", text: "text-warning" },
  { bg: "bg-primary", text: "text-light" },
  { bg: "bg-primary", text: "text-dark" },
  { bg: "bg-primary", text: "text-danger" },
  { bg: "bg-danger", text: "text-light" },
  { bg: "bg-danger", text: "text-dark" },
  { bg: "bg-danger", text: "text-warning" },
  { bg: "bg-warning", text: "text-light" },
  { bg: "bg-warning", text: "text-dark" },
  { bg: "bg-warning", text: "text-danger" },
  { bg: "bg-light", text: "text-info" },
  { bg: "bg-light", text: "text-success" },
  { bg: "bg-light", text: "text-dark" },
  { bg: "bg-light", text: "text-primary" },
  { bg: "bg-light", text: "text-danger" },
  { bg: "bg-light", text: "text-warning" },
];

const Questions = (props) => {
  //
  const [confirmBoxArg, setConfirmBoxArg] = useState("");

  const authToken = () => {
    if (localStorage.getItem("auth-token")) {
      return localStorage.getItem("auth-token");
    } else if (sessionStorage.getItem("auth-token")) {
      return sessionStorage.getItem("auth-token");
    } else {
      return false;
    }
  };

  const deleteQuestion = (question) => {
    axios
      .post(
        "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/course/resources/delete-question",
        // "http://localhost:5000/course/resources/delete-question",
        { userID: sessionStorage.getItem("user_id"), question: question },
        { headers: { Authorization: authToken() } }
      )
      .then((res) => {
        if (res.data.isQuestionAuthor === false) {
          alert("Parece que você não é o autor desta pergunta");
        } else {
          props.fetchQuestions(props.resources.prefix);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="tab-pane fade inactivate_tab"
      id="questions"
      role="tabpanel"
      aria-labelledby="questions-tab"
    >
      {props.resources.questions && !props.intro ? (
        props.resources.questions.map((question) => {
          const color = colors[Math.floor(Math.random() * 29)];
          return (
            <div
              key={question.question_id}
              id={question.question_id}
              className={
                "lesson_resources_questions row m-0 p-0 " +
                (question.answer ? "answered" : "")
              }
            >
              <div className="lesson_resources_picture col-sm-1 col-2 p-0">
                {question.picture ? (
                  <img src={question.picture} alt="..." />
                ) : (
                  <span
                    className={
                      "lesson_resources_userinitials font-weight-bold " +
                      color.bg +
                      " " +
                      color.text
                    }
                  >
                    {question.fName.slice(0, 1).toUpperCase() +
                      question.lName.slice(0, 1).toUpperCase()}
                  </span>
                )}
                <Tippy
                  allowHTML={true}
                  hideOnClick={false}
                  disabled={question.answer ? false : true}
                  theme="light"
                  className="tippy_answer"
                  content={
                    <div>
                      {question.answer ? (
                        <div className="p-2">
                          <div className="lesson_resources_picture row m-0 mb-3">
                            <img
                              className="col-2 p-0 mt-0"
                              src={
                                question.answer.picture
                                  ? question.answer.picture
                                  : "/images/profile-pic.png"
                              }
                              alt="..."
                            />
                            <div className="question_answer_body col-10 pl-2">
                              {question.answer.body}
                            </div>
                          </div>
                          <div className="text-muted text-right">
                            <i>respondido {date(question.answer.answeredAt)}</i>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  }
                >
                  <div className="fas-icon">
                    <i className="fas fa-comments"></i>
                  </div>
                </Tippy>
              </div>
              <div className="col-sm-11 col-10 user_question">
                <div className="lesson_resources_question_title row p-0 m-0">
                  <span className="col-9 col-sm-10 p-0">
                    {question.question.title}
                  </span>
                  {question.user_id === sessionStorage.getItem("user_id") ? (
                    <div className="col-3 col-sm-2 row p-0 m-0">
                      <button
                        onClick={() =>
                          document
                            .getElementById(question.question_id + "_edit")
                            .classList.toggle("d-none")
                        }
                        className="btn text-warning col-6 p-0 mt-0"
                      >
                        <small>editar</small>
                      </button>
                      <button
                        onClick={() => setConfirmBoxArg(question)}
                        data-toggle="modal"
                        data-target="#confirmBoxModal"
                        className="btn text-danger col-6 p-0 mt-0"
                      >
                        <small>deletar</small>
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  {props.adminPanel ? (
                    <button
                      onClick={() => props.answerQuestion(question)}
                      data-toggle="modal"
                      data-target="#answerQuestionModal"
                      className={
                        "btn p-0 col-3 col-sm-2 " +
                        (question.answer ? "text-muted" : "text-success")
                      }
                    >
                      <small>
                        <u>
                          <b>{question.answer ? "editar" : "responder"}</b>
                        </u>
                      </small>
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <div className="lesson_resources_question_body">
                  {question.question.body}
                </div>
                <div id={question.question_id + "_edit"} className="d-none">
                  <UpdateQuestion
                    prefix={props.resources.prefix}
                    fetchQuestions={props.fetchQuestions}
                    question={question}
                  />
                </div>
                <br />
                <div className="lesson_resources_details">
                  <span className="text-info">
                    {question.fName + " " + question.lName}
                  </span>
                  <span className="text-dark"> &#xB7; </span>
                  <span className="text-muted">{date(question.date)}</span>{" "}
                  {question.lastUpdated ? (
                    <span className="text-muted">
                      <span className="text-dark">&#xB7; </span>
                      <u>editado {date(question.lastUpdated)}</u>
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <hr />
              </div>
            </div>
          );
        })
      ) : (
        <i className="text-info">Seja o primeiro a perguntar</i>
      )}
      <QuestionInput
        prefix={props.resources.prefix}
        fetchQuestions={props.fetchQuestions}
      />
      <ConfirmBox
        modalBody={"Você realmente deseja deletar essa pergunta?"}
        confirm={deleteQuestion}
        arg={confirmBoxArg}
      />
    </div>
  );
};

export default Questions;
