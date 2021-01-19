import { useState } from "react";
import { VerticalNav, HorizontalNav } from "./AdminNav";
import DashboardCourse from "./DashboardCourse";
import "../../styles/Admin.css";

const Admin = () => {
  const [component, setComponent] = useState({
    component: DashboardCourse,
    props: "",
  });

  const updateComponent = (params) => {
    setComponent({ component: params.component, props: params.props });

    //---------------- add class 'active' to current component -----------------
    const activeTab = document.getElementById("admin_" + params.component.name);
    console.log("out");
    console.log(activeTab);
    if (activeTab) {
      console.log("in");
      document.getElementsByClassName("active")[0].classList.remove("active");
      activeTab.classList.add("active");
    }
  };

  return (
    <div className="admin row p-0 m-0">
      <div className="col-md-3 col-xl-2 p-0">
        <VerticalNav updateComponent={updateComponent} component={component} />
      </div>

      <div className="col-md-9 col-xl-10 p-0">
        <HorizontalNav />

        <div className="component">
          <component.component
            updateComponent={updateComponent}
            props={component.props}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
