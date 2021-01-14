import React from "react";
import Countdown from "./Countdown";
import ClassRoomNav from "./ClassRoomNav";

const ClassRoom = () => {
  return (
    <div>
      <ClassRoomNav />
      <div className="text-center mt-5 pt-5">
        <div className="mt-5 text-secondary h4">
          <span>👷‍♀️</span>
          <br />
          <br />
          <i>esta seção ficará pronta em:</i>
        </div>
        <Countdown endTime={Date.UTC(2021, 0, 15, 17, 0, 0, 0)} />
      </div>
    </div>
  );
};

export default ClassRoom;
