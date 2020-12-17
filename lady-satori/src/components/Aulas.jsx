// import Login from "./Login";
// import Error400 from "./Errors/Error400";
// import Error429 from './Errors/Error429';
// import Loading from "./Errors/Loading";
// import useAxios from "axios-hooks";

function Aulas() {
  // const localToken = localStorage.getItem("auth-token");
  // const sessionToken = sessionStorage.getItem("auth-token");

  // const [{ data, loading, error }] = useAxios({
  //   url: "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/auth/isLoggedIn",
  //   headers: { localToken, sessionToken },
  // });

  // if (loading)
  //   return <Loading />

  // if (error) {
  //   //check if it is an rate-limiting error
  //   if (error.toJSON().message.split(" ").slice(-1)[0] === "429") {
  //     //if afirmative, send custom "too many requests" error message
  //     return <Error429 />;
  //   } else {
  //     return <Error400 />;
  //   }
  // }

  // if (data.isLoggedIn === false || data.isTokenOk === false) {
  //   return (
  //     <div>
  //       <Login />
  //     </div>
  //   );
  // } else {
  return (
    <div className="container-fluid text-center">
      <div className="p-3 border-right border-left border-bottom border-danger rounded-bottom shadow">
        <h1 className="display-5 mt-5">AUTHENTICATED</h1>
        <a className="btn btn-sm btn-warning m-3" href="/">
          HOME
        </a>
      </div>
    </div>
  );
}
// }

export default Aulas;
