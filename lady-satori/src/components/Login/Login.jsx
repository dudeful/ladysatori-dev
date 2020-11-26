import React from "react";
import axios from "axios";
import Error400 from "../Errors/Error400";
import LoginFrame from "./LoginFrame";
import RegisterFrame from "./RegisterFrame";
const emailValidator = require("email-validator");

function Login() {
  const [login, setLogin] = React.useState({
    email: "",
    password: "",
  });

  const [checkbox, setCheckbox] = React.useState(false);

  const [register, setRegister] = React.useState({
    fName: "",
    lName: "",
    email: "",
    newUserPassword: "",
    newUserPassword2: "",
  });

  const [regStyle, setRegStyle] = React.useState({
    btnStyle1: {},
    btnStyle2: { display: "none" },
    userFNameInput: {},
    userLNameInput: {},
    userEmailInput: {},
    userPasswordInput: { display: "none" },
    userPasswordInput2: { display: "none" },
  });

  //useState Hooks for handling erros messages, input changes and clicks
  const [emptyError, setEmptyError] = React.useState("");
  const [emptyError2, setEmptyError2] = React.useState("");
  const [emptyLogin, setEmptyLogin] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [registerError, setRegisterError] = React.useState("");
  const [userExists, setUserExists] = React.useState("");
  const [loginError, setLoginError] = React.useState("");
  const [wrongPassword, setWrongPassword] = React.useState("");
  const [userNotFound, setUserNotFound] = React.useState("");

  //Change Handle - Register Password Input
  function passwordHandler(event) {
    if (event.target.value.length < 8) {
      setPasswordError("Sua senha deve ter pelo menos 8 caracteres");
    } else if (/\d/.test(event.target.value) === false) {
      setPasswordError("Sua senha deve ter pelo menos um número");
    } else if (/[a-zA-Z]+/.test(event.target.value) === false) {
      setPasswordError("Sua senha deve ter pelo menos uma letra");
    } else {
      setPasswordError("");
    }
    const confirmPassword = document.getElementById("confirm-password");
    confirmPassword.classList.remove("blinking");
    const passwordValidation = document.getElementById("password-validation");
    passwordValidation.classList.remove("blinking");
    handleChange(event);
  }

  //Change Handle - Register Inputs
  function registerEmailHandler(event) {
    if (emailValidator.validate(event.target.value) === false) {
      setRegisterError("Endereço de email inválido");
    } else {
      setRegisterError("");
    }
    const emailValidation = document.getElementById("InputEmail1");
    emailValidation.classList.remove("blinking");
    handleChange(event);
    setUserExists("");
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setRegister((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  //Change Handle - Login Email
  function loginEmailHandler(event) {
    if (emailValidator.validate(event.target.value) === false) {
      setLoginError("Endereço de email inválido");
    } else {
      setLoginError("");
    }
    const emailValidation = document.getElementById("InputEmail1");
    emailValidation.classList.remove("blinking");
    handleChangeLogin(event);
    // if (login.email === "") {
    //   setUserNotFound("");
    // }
  }

  //Change Handle - Login Inputs
  function handleChangeLogin(event) {
    const { name, value } = event.target;

    setLogin((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  //Change Handle - Login Checkbox
  function handleCheckbox() {
    setCheckbox(!checkbox);
  }

  //Click Handle - Login Button
  function handleClickLogin(e) {
    e.preventDefault();

    const User = {
      email: login.email,
      password: login.password,
      checkbox: checkbox,
    };

    if (login.email === "" || login.password === "") {
      e.preventDefault();
      setEmptyLogin(
        <small style={{ color: "red" }}>
          Oops! Você esqueceu deste aqui{" "}
          <span role="img" aria-label="detective-emoji">
            &#129488;
          </span>
        </small>
      );
    } else if (emailValidator.validate(login.email) === false) {
      e.preventDefault();
      const loginEmailValidation = document.getElementById(
        "loginEmail-validation"
      );
      loginEmailValidation.classList.add("blinking");
    } else {
      axios.post("http://localhost:5000/api/auth/login", User).then((res) => {
        if (res.data === false) {
          setWrongPassword(
            <small style={{ color: "red" }}>
              Oops! Senha Invalida{" "}
              <span role="img" aria-label="detective-emoji">
                &#129488;
              </span>
            </small>
          );
        } else if (res.data.state === false) {
          console.log(res.data);
          setUserNotFound(
            <small style={{ color: "red" }}>
              Oops! Usuário não encontrado{" "}
              <span role="img" aria-label="detective-emoji">
                &#129488;
              </span>
            </small>
          );
        } else {
          setWrongPassword("");
          setUserNotFound("");
          localStorage.setItem("auth-token", res.data.token);
          console.log(res.data.token);
          window.location = "/";
        }
      });
    }
  }

  //Click Handle - Register Button #1
  function handleClickRegister(e) {
    e.preventDefault();

    if (
      register.fName === "" ||
      register.lName === "" ||
      register.email === ""
    ) {
      e.preventDefault();
      setEmptyError(
        <small style={{ color: "red" }}>
          Oops! Você esqueceu deste aqui{" "}
          <span role="img" aria-label="detective-emoji">
            &#129488;
          </span>
        </small>
      );
    } else if (emailValidator.validate(register.email) === false) {
      e.preventDefault();
      const registerEmailValidation = document.getElementById(
        "registerEmail-validation"
      );
      registerEmailValidation.classList.add("blinking");
    } else {
      const checkEmail = { checkEmail: register.email };
      axios
        .post("http://localhost:5000/api/users/checkEmail", checkEmail)
        .then((res) => {
          if (res.data.userExists === true) {
            setUserExists(
              <small id="userExists" style={{ color: "red" }}>
                Oops! Este email já está registrado{" "}
                <span role="img" aria-label="detective-emoji">
                  &#129488;
                </span>
              </small>
            );
            const userAlreadyExists = document.getElementById("userExists");
            userAlreadyExists.classList.add("blinking");
          } else {
            setRegStyle({
              btnStyle1: { display: "none" },
              userFNameInput: { display: "none" },
              userLNameInput: { display: "none" },
              userEmailInput: { display: "none" },
              userPasswordInput2: { marginBottom: "2rem" },
            });
          }
        });
    }
  }

  //Click Handle - Register Button #2
  function handleClickRegister2(e) {
    e.preventDefault();

    const newUser = {
      fName: register.fName,
      lName: register.lName,
      email: register.email,
      password: register.newUserPassword,
    };

    if (register.newUserPassword === "" || register.newUserPassword2 === "") {
      e.preventDefault();
      setEmptyError2(
        <small style={{ color: "red" }}>
          Oops! Você esqueceu deste aqui{" "}
          <span role="img" aria-label="detective-emoji">
            &#129488;
          </span>
        </small>
      );
    } else if (register.newUserPassword !== register.newUserPassword2) {
      e.preventDefault();
      const confirmPassword = document.getElementById("confirm-password");
      confirmPassword.classList.add("blinking");
    } else if (
      register.newUserPassword.length < 8 ||
      /\d/.test(register.newUserPassword) === false ||
      /[a-zA-Z]+/.test(register.newUserPassword) === false
    ) {
      e.preventDefault();
      const passwordValidation = document.getElementById("password-validation");
      passwordValidation.classList.add("blinking");
    } else {
      axios
        .post("http://localhost:5000/api/users/registration", newUser)
        .then((res) => {
          if (res.data.type === "400") {
            return <Error400 />;
          } else {
            localStorage.setItem("auth-token", res.data.token);
            // window.name = res.data.user.id;
            window.location = "/";
          }
        });
    }
  }

  // ---------------------TO BE RENDERED--------------------
  return (
    <div>
      <LoginFrame
        loginEmailHandler={loginEmailHandler}
        login={login}
        emptyLogin={emptyLogin}
        loginError={loginError}
        userNotFound={userNotFound}
        handleChangeLogin={handleChangeLogin}
        wrongPassword={wrongPassword}
        handleCheckbox={handleCheckbox}
        checkbox={checkbox}
        handleClickLogin={handleClickLogin}
      />
      <RegisterFrame
        register={register}
        regStyle={regStyle}
        handleChange={handleChange}
        emptyError={emptyError}
        registerEmailHandler={registerEmailHandler}
        userExists={userExists}
        registerError={registerError}
        passwordHandler={passwordHandler}
        emptyError2={emptyError2}
        passwordError={passwordError}
        handleClickRegister={handleClickRegister}
        handleClickRegister2={handleClickRegister2}
      />
    </div>
  );
}

export default Login;
