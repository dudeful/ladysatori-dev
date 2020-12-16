import Tippy from "@tippyjs/react";
import { PasswordResetModal } from "../Login/PasswordResetModal";

function LoginFrame(props) {
  return (
    <div className="login-form login-block" id="login-block">
      <p className="heading">ADMIN</p>
      <input
        className="userInput"
        onChange={props.loginHandler}
        type="email"
        name="email"
        value={props.login.email}
        aria-describedby="emailHelp"
        placeholder="endereço de email"
        autoFocus
      />

      <hr className="input-bottom-border" />

      <input
        onChange={props.loginHandler}
        type="password"
        className="userInput"
        name="password"
        value={props.login.password}
        placeholder="senha"
      />

      <hr className="input-bottom-border" />

      <div className="text-right aaq">
        <button
          className="reset-password"
          data-toggle="modal"
          data-target="#passwordResetModal"
        >
          <small>recuperar</small>
        </button>
      </div>
      <Tippy
        theme="material"
        visible={props.emailTooltip}
        content={
          <span className="text-light">
            hmm.. este email não está cadastrado &#129488;
          </span>
        }
      >
        <Tippy
          theme="material"
          visible={props.passwordTooltip}
          content={
            <span className="text-light">
              oops! sua senha está incorreta &#129488;
            </span>
          }
        >
          <Tippy
            theme="material"
            visible={props.emptyFields}
            content={
              <span className="text-light">
                oops! parece que existem campos vazios &#129488;
              </span>
            }
          >
            <button
              onClick={props.handleLoginClick}
              className="login-button btn btn-sm w-50"
            >
              Entrar
            </button>
          </Tippy>
        </Tippy>
      </Tippy>
      <div className="row">
        <hr className="col-7 p-0 ml-0" />
        <p className="ou col-1 p-0"> ou </p>
        <hr className="col-3 p-0 mr-0" />
      </div>
      <div className="row login-social-icons mt-3">
        <div className="col-4">
          <p>entre</p>
          <p className="ml-4">com</p>
        </div>
        <div className="adminlogin-google col-8 m-auto p-0 row">
          <a
            className="text-decoration-none"
            href={
              "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/admin/oauth2-google/" +
              //make all the url path (no matter how many paths) a single string for a single route parameter
              window.location.pathname.replace(/\//g, "@fSlash@")
            }
          >
            <i style={{ color: "#4285F4" }} className="fab fa-google"></i>
            <span style={{ color: "#DB4437", fontWeight: "600" }}>o</span>
            <span style={{ color: "#F4B400", fontWeight: "600" }}>o</span>
            <span style={{ color: "#4285F4", fontWeight: "600" }}>g</span>
            <span style={{ color: "#0F9D58", fontWeight: "600" }}>l</span>
            <span style={{ color: "#DB4437", fontWeight: "600" }}>e</span>
          </a>
        </div>
      </div>
      <PasswordResetModal
        passwordReset={props.passwordReset}
        resetTooltip={props.resetTooltip}
        resetInput={props.resetInput}
        resetHandler={props.resetHandler}
        removeTooltip={props.removeTooltip}
      />
    </div>
  );
}

export default LoginFrame;
