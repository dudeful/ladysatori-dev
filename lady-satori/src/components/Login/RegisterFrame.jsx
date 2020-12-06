import Tippy from "@tippyjs/react";

function RegisterFrame(props) {
  return (
    <div className="login-form register-block" id="register-block">
      <p className="heading">registrar</p>
      <div style={props.fForm}>
        <input
          className="userInput"
          onChange={props.registerHandler}
          type="text"
          name="fName"
          value={props.register.fName}
          id="fName"
          aria-describedby="fNameHelp"
          placeholder="nome"
        />
        <hr className="input-bottom-border" />

        <input
          className="userInput"
          onChange={props.registerHandler}
          type="text"
          name="lName"
          value={props.register.lName}
          id="lName"
          aria-describedby="lNameHelp"
          placeholder="sobrenome"
        />
        <hr className="input-bottom-border" />
        <Tippy
          theme="material"
          visible={props.emailTooltip}
          content={
            <span className="text-light">
              hmm.. este não parece um email válido &#129488;
            </span>
          }
        >
          <input
            className="userInput"
            onChange={props.registerHandler}
            onBlur={props.emailTooltipHandler}
            type="email"
            name="email"
            value={props.register.email}
            id="InputEmail1"
            aria-describedby="emailHelp"
            placeholder="endereço de email"
          />
        </Tippy>
        <hr className="input-bottom-border" />
      </div>

      <div style={props.lForm}>
        <Tippy
          interactive={true}
          allowHTML={true}
          theme="material"
          visible={props.passwordTooltip}
          content={
            <span className="text-light">
              &#x274C; {props.passwordError}
              <a
                className="text-decoration-none text-warning"
                href="https://www.security.org/how-secure-is-my-password/"
                target="_blank"
                rel="noreferrer"
              >
                teste sua senha
              </a>
            </span>
          }
        >
          <input
            onChange={props.registerHandler}
            onBlur={props.passwordTooltipHandler}
            type="password"
            className="userInput"
            name="newUserPassword"
            id="InputPassword2"
            value={props.register.newUserPassword}
            placeholder="senha"
            required
          />
        </Tippy>
        <hr className="input-bottom-border" />

        <Tippy
          theme="material"
          visible={props.passwordTooltip2}
          content={
            <span className="text-light">
              ei ei ei! as duas senhas precisam ser iguais &#129488;
            </span>
          }
        >
          <input
            onChange={props.registerHandler}
            onBlur={props.passwordTooltipHandler2}
            type="password"
            className="userInput"
            name="newUserPassword2"
            id="InputPassword3"
            value={props.register.newUserPassword2}
            placeholder="confirmar senha"
            required
          />
        </Tippy>
        <hr className="input-bottom-border" />
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
            name="keepLogged"
            id="defaultCheck1"
            value={props.checkbox}
            style={props.lForm}
          />
        </Tippy>
        <label className="form-check-label" htmlFor="defaultCheck1">
          <small className="checkbox" style={props.lForm}>
            lembrar
          </small>
        </label>
        <div className="not-registered-link">
          <small>
            <button className="btn p-0 border-0" onClick={props.switchForms2}>
              <u>já é registrado?</u>
            </button>
          </small>
        </div>
      </div>

      <Tippy
        theme="material"
        visible={props.userExists}
        content={
          <span className="text-light">
            ahá! este email já está cadastrado &#129488;
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
            onClick={props.handleEmailCheck}
            className="register-button btn btn-sm w-50 fForm"
            style={props.fForm}
          >
            Registrar
          </button>
        </Tippy>
      </Tippy>

      <Tippy
        theme="material"
        visible={props.emptyFields2}
        content={
          <span className="text-light">
            oops! parece que existem campos vazios &#129488;
          </span>
        }
      >
        <Tippy
          theme="material"
          visible={props.emailTooltip2}
          content={
            <span className="text-light">
              hmm.. este não parece um email válido &#129488;
            </span>
          }
        >
          <button
            onClick={props.handleRegisterClick}
            className="register-button btn btn-sm w-50 lForm"
            style={props.lForm}
          >
            Registrar
          </button>
        </Tippy>
      </Tippy>

      <div className="row">
        <hr className="col-7 p-0 ml-0" />
        <p className="ou col-1 p-0"> ou </p>
        <hr className="col-3 p-0 mr-0" />
      </div>

      <div className="row login-social-icons mt-3">
        <div className="col-4">
          <p>registre</p>
          <p className="ml-5">com</p>
        </div>
        <div className="col-7 mt-auto ml-auto mr-0 p-0 row">
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
    </div>
  );
}

export default RegisterFrame;
