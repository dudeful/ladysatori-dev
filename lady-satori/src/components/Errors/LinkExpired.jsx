export const LinkExpired = () => {
  return (
    <div className="container" style={{ margin: "5% auto", height: "70px" }}>
      <div
        className="alert alert-danger text-center"
        role="alert"
        style={{ height: "100%", padding: "20px", fontSize: "1.1rem" }}
      >
        parece que este link expirou 😶
      </div>
      <button
        onClick={() => (window.location = "/login")}
        type="button"
        className="btn btn-outline-info btn-sm"
      >
        ir para login
      </button>
    </div>
  );
};
