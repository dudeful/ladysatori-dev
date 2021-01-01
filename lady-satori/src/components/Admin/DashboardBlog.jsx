import React from "react";
import Countdown from "../Countdown";

const DashboardBlog = () => {
  return (
    <div>
      <Countdown endTime={Date.UTC(2021, 0, 10, 12, 0, 0, 0)} />
    </div>
  );
};

export default DashboardBlog;
