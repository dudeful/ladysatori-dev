import "../../styles/ClassRoom.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Errors/Loading";
import ClassRoomNav from "./Nav/ClassRoomNav";
import Lesson from "./Lesson";
import AnswerQuestion from "../Admin/AnswerQuestion";

const ClassRoom = (props) => {
  const [lessonURL, setLessonURL] = useState({
    intro: "d-none",
    active: "active",
    video: "https://www.youtube.com/watch?v=4Myyq6BcKHs",
  });
  const [resources, setResources] = useState("");
  const [lessons, setLessons] = useState("");
  const [modules, setModules] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/course/videos/get-keys"
        // "http://localhost:5000/course/videos/get-keys"
      )
      .then((res) => {
        let modulesKeys = res.data.keys.map((key) => {
          return {
            id: key.prefix.split("/")[0],
            name: key.prefix.split("/")[1],
            prefix: key.prefix,
          };
        });

        modulesKeys = modulesKeys.filter(
          (module, index, self) =>
            index ===
            self.findIndex((m) => m.id === module.id && m.name === module.name)
        );

        setModules(modulesKeys);

        return res.data;
      })
      .then((data) => {
        let lessonsKeys = data.keys.map((key) => {
          return {
            moduleID: key.prefix.split("/")[0],
            id: key.prefix.split("/")[2],
            name: key.prefix.split("/")[3],
            prefix: key.prefix,
          };
        });

        lessonsKeys = lessonsKeys.filter(
          (lesson, index, self) =>
            index ===
            self.findIndex(
              (l) => l.moduleID === lesson.moduleID && l.id === lesson.id
            )
        );
        setLessons(lessonsKeys);

        return data;
      })
      .then((data) => {
        const complements = data.keys.map(async (key) => {
          const res = await axios.get(
            "https://dcp2jmsc5uert.cloudfront.net/resources/complements/" +
              key.prefix
          );
          return res.data;
        });

        Promise.all(complements).then((complement) => {
          setResources((prev) => {
            return {
              ...prev,
              complements_all: complement,
            };
          });
        });
      })
      .then(() => {
        axios
          .get("https://dcp2jmsc5uert.cloudfront.net/resources/about")
          .then((res) => {
            setResources((prev) => {
              return {
                ...prev,
                about: res.data,
              };
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  const fetchQuestions = (prefix) => {
    axios
      .get(
        "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/course/resources/questions",
        // "http://localhost:5000/course/resources/questions",
        {
          params: { prefix: prefix },
        }
      )
      .then((res) => {
        if (res.data.questions[0]) {
          let questions = res.data.questions.map(async (question) => {
            const res = await axios.get(question);
            return res.data;
          });

          Promise.all(questions).then((question) => {
            setResources((prev) => {
              return {
                ...prev,
                questions: question,
              };
            });
          });
        } else {
          setResources((prev) => {
            return {
              ...prev,
              questions: "",
            };
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const currentLesson = (prefix) => {
    axios
      .get(
        "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/course/videos/get-video-url",
        // "http://localhost:5000/course/videos/get-video-url",
        {
          params: { prefix: prefix },
        }
      )
      .then((res) => {
        setLessonURL(res.data.urls);
      })
      .then(() => {
        axios
          .get(
            "https://dcp2jmsc5uert.cloudfront.net/resources/briefing/" + prefix
          )
          .then((res) => {
            setResources((prev) => {
              return {
                ...prev,
                briefing: res.data,
                prefix: prefix,
              };
            });
          })
          .then(() => {
            axios
              .get(
                "https://dcp2jmsc5uert.cloudfront.net/resources/complements/" +
                  prefix
              )
              .then((res) => {
                setResources((prev) => {
                  return {
                    ...prev,
                    complements: res.data,
                  };
                });
              });
          })
          .then(() => {
            fetchQuestions(prefix);
          })
          .catch((err) => console.log(err));
      })
      .then(() => {
        Array.from(document.getElementsByClassName("inactivate_tab")).forEach(
          (el) => {
            el.classList.remove("active");
            el.classList.remove("show");
          }
        );

        document.getElementById("briefing-tab").classList.add("active");
        const briefing = document.getElementById("briefing");
        briefing.classList.add("show");
        briefing.classList.add("active");
      })
      .catch((err) => console.log(err));
  };

  const [question, setQuestion] = useState("");
  const answerQuestion = (question) => {
    setQuestion(question);
  };

  if (!modules || !lessons || !resources) {
    return <Loading />;
  } else
    return (
      <div>
        <ClassRoomNav
          adminPanel={props.adminPanel}
          lessons={lessons}
          currentLesson={currentLesson}
          modules={modules}
        />
        <div
          className="course_body"
          style={props.adminPanel ? { marginTop: "64px" } : {}}
        >
          <Lesson
            editLesson={props.editLesson}
            adminPanel={props.adminPanel}
            answerQuestion={answerQuestion}
            lessonURL={lessonURL}
            resources={resources}
            fetchQuestions={fetchQuestions}
          />
        </div>
        <AnswerQuestion
          prefix={resources.prefix}
          fetchQuestions={fetchQuestions}
          question={question}
        />
      </div>
    );
};

export default ClassRoom;
