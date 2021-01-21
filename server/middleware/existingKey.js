const _ = require("lodash");

const existingKey = (req, res, next) => {
  const key = { module: req.body.keys.module_name, lesson: req.body.keys.lesson_name };

  const module = () => {
    if (req.body.existingModules[0]) {
      const module = req.body.existingModules.filter(
        (module) => module.name.toLowerCase() === _.replace(key.module.trim().toLowerCase(), " ", "_")
      );
      return module;
    } else {
      return false;
    }
  };

  if (module()[0]) {
    const lessons = req.body.existingLessons.filter((lesson) => lesson.module === module()[0].id);
    const newLessonName = _.replace(key.lesson.trim().toLowerCase(), " ", "_");

    const existingLessonsNames = lessons.map((l) => {
      return l.lesson.toLowerCase();
    });

    if (existingLessonsNames.includes(newLessonName)) {
      res.send({ error: true, msg: "lesson name is duplicate" });
    } else {
      next();
    }
  } else {
    next();
  }
};

module.exports = existingKey;
