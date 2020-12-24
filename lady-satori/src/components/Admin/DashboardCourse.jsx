const DashboardCourse = () => {
  const hello = [];
  for (let i = 0; i < 500; i++) {
    hello.push("hello friend");
  }

  return (
    <div className="row">
      {hello.map((hello) => {
        return (
          <p className="col" key={Math.random() + Math.random()}>
            {hello}
          </p>
        );
      })}
    </div>
  );
};

export default DashboardCourse;
