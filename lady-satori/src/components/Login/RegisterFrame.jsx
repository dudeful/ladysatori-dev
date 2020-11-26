function RegisterFrame(props) {
  return (
    <div className="email-login ml-auto col-lg-4 mr-4">
      <h3>
        <span>Olá,</span> {props.register.fName} {props.register.lName}
      </h3>
      <p>{props.register.email}</p>
      <form>
        <div className="form-group" style={props.regStyle.userFNameInput}>
          <label htmlFor="InputFName1" className="mb-0">
            Nome
          </label>
          <input
            onChange={props.handleChange}
            type="text"
            className="form-control"
            id="InputFName1"
            name="fName"
            value={props.register.fName}
            required
          />
          {props.register.fName === "" ? props.emptyError : ""}
        </div>
        <div className="form-group" style={props.regStyle.userLNameInput}>
          <label htmlFor="InputLName1" className="mb-0">
            Sobrenome
          </label>
          <input
            onChange={props.handleChange}
            type="text"
            className="form-control"
            id="InputLName1"
            name="lName"
            value={props.register.lName}
            required
          />
          {props.register.lName === "" ? props.emptyError : ""}
        </div>
        <div className="form-group" style={props.regStyle.userEmailInput}>
          <label htmlFor="InputEmail1" className="mb-0">
            Email
          </label>
          <input
            onChange={props.registerEmailHandler}
            type="e-mail"
            className="form-control"
            name="email"
            value={props.register.email}
            id="InputEmail1"
            aria-describedby="emailHelp"
            required
          />
          {props.userExists}
          {props.register.email === "" ? props.emptyError : ""}
          <small id="registerEmail-validation" style={{ color: "red" }}>
            {props.registerError}
          </small>
          <small id="emailHelp" className="form-text text-muted">
            Seu email está seguro conosco.
          </small>
        </div>
        <div className="form-group" style={props.regStyle.userPasswordInput}>
          <label htmlFor="InputPassword2">Senha</label>
          <input
            onChange={props.passwordHandler}
            type="password"
            className="form-control"
            name="newUserPassword"
            id="InputPassword2"
            value={props.register.newUserPassword}
            required
          />
          {props.register.newUserPassword === "" ? props.emptyError2 : ""}
          <small id="password-validation" style={{ color: "red" }}>
            {props.passwordError}
          </small>
        </div>
        <div className="form-group" style={props.regStyle.userPasswordInput2}>
          <label htmlFor="InputPassword3">Confirmar Senha</label>
          <input
            onChange={props.passwordHandler}
            type="password"
            className="form-control"
            name="newUserPassword2"
            id="InputPassword3"
            value={props.register.newUserPassword2}
            required
          />
          {props.register.newUserPassword2 === "" ? props.emptyError2 : ""}
          <small
            className="form-text"
            id="confirm-password"
            style={{ color: "red" }}
          >
            {props.register.newUserPassword !== props.register.newUserPassword2
              ? "As duas senhas precisam ser iguais!"
              : ""}
          </small>
        </div>
      </form>
      <button
        onClick={props.handleClickRegister}
        className="btn btn-sm btn-primary btn-block"
        style={props.regStyle.btnStyle1}
      >
        Registrar
      </button>
      <button
        onClick={props.handleClickRegister2}
        className="btn btn-sm btn-primary btn-block"
        style={props.regStyle.btnStyle2}
      >
        Finalizar Cadastro
      </button>
    </div>
  );
}

export default RegisterFrame;
