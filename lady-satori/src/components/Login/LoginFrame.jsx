import Tippy from "@tippyjs/react";
import { PasswordResetModal } from "./PasswordResetModal";

function LoginFrame(props) {
  return (
    <div className="login-form login-block" id="login-block">
      <p className="heading">login</p>
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
      <div className="form-check">
        <Tippy
          theme="light"
          content={
            <span className="text-info">
              sua sessão só encerrará quando selecionar <b>"sair"</b>
            </span>
          }
        >
          <input
            onChange={props.checkboxHandler}
            className="form-check-input mt-2 pt-0"
            type="checkbox"
            name="checkbox"
            id="defaultCheck1"
            value={props.checkbox}
          />
        </Tippy>
        <label className="form-check-label" htmlFor="defaultCheck1">
          <small className="checkbox">lembrar</small>
        </label>
        <div className="not-registered-link">
          <button className="btn p-0 border-0" onClick={props.notRegistered}>
            <small>
              <u>não está registrado?</u>
            </small>
          </button>
        </div>
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
        <div className="text-center col-8 m-auto p-0 row">
          <a href="http://localhost:5000/auth/google">
            <i className="col-4 fab fa-google"></i>
          </a>
          <a href="http://localhost:5000/auth/facebook">
            <i className="col-4 fab fa-facebook-f"></i>
          </a>
          <a href="http://localhost:5000/auth/twitter">
            <i className="col-4 fab fa-twitter"></i>
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
