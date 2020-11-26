function LoginFrame(props) {
  return (
    <div className="container-fluid mt-0 login">
      <div className="row">
        <div className="social-login col-lg-4 pr-4 pl-4 ml-4">
          <h5>Já tem uma conta?</h5>
          <form>
            <div className="form-group mt-3 mb-2">
              <label className="mb-0" htmlFor="InputEmail2">
                Email
              </label>
              <input
                onChange={props.loginEmailHandler}
                type="email"
                className="form-control form-control-sm"
                name="email"
                value={props.login.email}
                id="InputEmail2"
                aria-describedby="emailHelp"
                autoFocus
              />
              {props.login.email === "" ? props.emptyLogin : ""}
              <small id="loginEmail-validation" style={{ color: "red" }}>
                {props.loginError}
              </small>
              {props.userNotFound}
            </div>
            <div className="form-group mb-1">
              <label className="mb-0" htmlFor="InputPassword1">
                Senha{" "}
                <a className="password-recovery text-muted ml-1" href="/">
                  Recuperar Senha
                </a>
              </label>
              <input
                onChange={props.handleChangeLogin}
                type="password"
                className="form-control form-control-sm"
                name="password"
                id="InputPassword1"
                value={props.login.password}
              />
              {props.login.password === "" ? props.emptyLogin : ""}
              {props.wrongPassword}
            </div>
            <div className="form-check mb-2">
              <input
                onChange={props.handleCheckbox}
                className="form-check-input mt-2"
                type="checkbox"
                name="keepLogged"
                id="defaultCheck1"
                value={props.checkbox}
              />
              <label className="form-check-label" htmlFor="defaultCheck1">
                <small className="text-muted">Me mantenha conectado</small>
              </label>
            </div>
            <button
              onClick={props.handleClickLogin}
              className="btn btn-sm btn-block btn-outline-dark"
            >
              Entrar
            </button>
          </form>
          <hr className="mt-2" />
          <h5>Ou, você também pode</h5>
          <a
            className="btn btn-block btn-social btn-google mt-4 mb-3"
            href="https://dudeful-backend.herokuapp.com/api/auth/google"
            role="button"
          >
            <i className="fab fa-google p-1"></i>
            Entrar com Google
          </a>
          <a
            className="btn btn-block btn-social btn-facebook"
            href="https://dudeful-backend.herokuapp.com/api/auth/facebook"
            role="button"
          >
            <i className="fab fa-facebook p-1"></i>
            Entrar com Facebook
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginFrame;
