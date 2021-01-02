import React from "react";
import Countdown from "./Countdown";
import ClassRoomNav from "./ClassRoomNav";

const ClassRoom = () => {
  return (
    <div>
      <ClassRoomNav />
      <div className="mt-5">
        <Countdown endTime={Date.UTC(2021, 0, 10, 12, 0, 0, 0)} />
      </div>
    </div>
  );
};

export default ClassRoom;
