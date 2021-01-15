import Countdown from "../Countdown";
import ReactPlayer from "react-player";

const Course = () => {
  return (
    <div className="text-center mt-5 pt-5">
      <div className="mt-5 text-secondary h4">
        <span>👷‍♀️</span>
        <br />
        <br />
        <i>esta seção ficará pronta em:</i>
      </div>
      <Countdown endTime={Date.UTC(2021, 0, 15, 0, 0, 0, 0)} />
      <ReactPlayer
        light={true}
        controls
        url="https://dcp2jmsc5uert.cloudfront.net/videos/lesson_1/mvi_0201.m3u8"
      />
    </div>
  );
};

export default Course;
