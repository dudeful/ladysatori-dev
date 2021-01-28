import "../../styles/ClassRoom.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Errors/Loading";
import ClassRoomNav from "./Nav/ClassRoomNav";
import Lesson from "./Lesson";

const ClassRoom = () => {
  const [lessonURL, setLessonURL] = useState({
    intro: "d-none",
    active: "active",
    video: "https://www.youtube.com/watch?v=4Myyq6BcKHs",
  });
  const [resources, setResources] = useState({ about: "hello friend" });
  const [lessons, setLessons] = useState("");
  const [modules, setModules] = useState("");

  useEffect(() => {
    axios
      .get(
        // "https://lf2j6ejxq7.execute-api.sa-east-1.amazonaws.com/test/course/videos/get-keys"
        "http://localhost:5000/course/videos/get-keys"
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
      .catch((err) => console.log(err));
  }, []);

  const fetchQuestions = (prefix) => {
    axios
      .get(
        // "https://lf2j6ejxq7.execute-api.sa-east-1.amazonaws.com/test/course/resources/questions",
        "http://localhost:5000/course/resources/questions",
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
      });
  };

  const currentLesson = (prefix) => {
    axios
      .get(
        // "https://lf2j6ejxq7.execute-api.sa-east-1.amazonaws.com/test/course/videos/get-video-url",
        "http://localhost:5000/course/videos/get-video-url",
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
      .catch((err) => console.log(err));
  };

  if (!modules || !lessons || !resources) {
    return <Loading />;
  } else
    return (
      <div>
        <ClassRoomNav
          lessons={lessons}
          currentLesson={currentLesson}
          modules={modules}
        />
        <div className="course_body">
          <Lesson
            lessonURL={lessonURL}
            resources={resources}
            fetchQuestions={fetchQuestions}
          />
          <div className="text-center"></div>
        </div>
      </div>
    );
};

export default ClassRoom;
