import "../../styles/Login.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/material.css";
import React from "react";
import axios from "axios";
// import Error400 from "../Errors/Error400";
import LoginFrame from "./LoginFrame";
import RegisterFrame from "./RegisterFrame";
import emailValidator from "email-validator";
import passwordValidator from "password-validator";
import passwordBlacklist from "./passwordBlacklist";

function Login() {
  const [recoveryTooltip, setRecoveryTooltip] = React.useState(false);
  const [recoveryInput, setRecoveryInput] = React.useState("");

  const [login, setLogin] = React.useState({
    email: "",
    password: "",
  });

  const [register, setRegister] = React.useState({
    fName: "",
    lName: "",
    email: "",
    newUserPassword: "",
    newUserPassword2: "",
  });

  const [registerTooltip, setRegisterTooltip] = React.useState({
    email: false,
    password: false,
    password2: false,
    userExists: false,
    emptyFields: false,
    emptyFields2: false,
  });

  const [regPasswordError, setRegPasswordError] = React.useState(null);
  const [registerCheckbox, setRegisterCheckbox] = React.useState(false);

  const [loginCheckbox, setLoginCheckbox] = React.useState(false);
  const [loginTooltip, setLoginTooltip] = React.useState({
    email: false,
    password: false,
    emptyFields: false,
  });

  const [fForm, setFForm] = React.useState({ display: "initial" });
  const [lForm, setLForm] = React.useState({ display: "none" });

  const switchForms = () => {
    document.getElementById("horizontal-bottom-line").style.bottom = "106px";
    setFForm({ display: "none" });
    setLForm({ display: "initial" });
  };
  const switchForms2 = () => {
    setFForm({ display: "initial" });
    setLForm({ display: "none" });
    setRegisterTooltip({
      email: false,
      password: false,
      password2: false,
      userExists: false,
      emptyFields: false,
      emptyFields2: false,
    });
    alreadyRegistered();
  };

  const alreadyRegistered = () => {
    document.getElementById("horizontal-bottom-line").style.bottom = "82px";
    document.getElementById("register-block").classList.add("hide-block");
    document.getElementById("login-block").classList.add("show-block");
    document.getElementById("register-block").classList.remove("show-block");
    document.getElementById("lines-block").classList.add("login");
    document.getElementById("lines-block").classList.remove("register");
  };

  const notRegistered = () => {
    setLoginTooltip({ email: false, password: false, emptyFields: false });
    document.getElementById("horizontal-bottom-line").style.bottom = "47px";
    document.getElementById("login-block").classList.add("hide-block");
    document.getElementById("register-block").classList.add("show-block");
    document.getElementById("login-block").classList.remove("show-block");
    document.getElementById("lines-block").classList.add("register");
    document.getElementById("lines-block").classList.remove("login");
  };

  //-----------------PASSWORD VALIDATION------------------------
  // Create a schema
  var passwordSchema = new passwordValidator();

  // Add properties to it
  passwordSchema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(50) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(1) // Must have at least 1 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(passwordBlacklist(register)); // Blacklist these values

  //-----------------PASSWORD RECOVERY--------------------------
  const removeTooltip = () => {
    setRecoveryTooltip(false);
  };

  const recoveryHandler = (event) => {
    setRecoveryInput(event.target.value);
    setRecoveryTooltip(false);
  };

  const passwordRecovery = () => {
    if (recoveryInput) {
      axios
        .post("http://localhost:5000/users/checkEmail", {
          email: recoveryInput,
        })
        .then((res) => {
          if (res.data.userExists === true) {
            console.log("mail chimp");
            setRecoveryTooltip(false);
          } else {
            //send email through emailing provider
            setRecoveryTooltip(true);
          }
        });
    }
  };
  //-----------------HANDLING LOGIN INPUTS----------------------

  const loginHandler = (event) => {
    const { name, value } = event.target;

    setLogin((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });

    setLoginTooltip({ email: false, password: false, emptyFields: false });
  };

  const loginCheckboxHandler = (event) => {
    setLoginCheckbox(!loginCheckbox);
  };

  const handleLoginClick = (event) => {
    const User = {
      email: login.email,
      password: login.password,
      remember: loginCheckbox,
    };

    if (!login.email || !login.password) {
      setLoginTooltip((prevValue) => {
        return {
          ...prevValue,
          emptyFields: true,
        };
      });
    } else {
      axios.post("http://localhost:5000/auth/login", User).then((res) => {
        if (res.data.state === false) {
          setLoginTooltip((prevValue) => {
            return {
              ...prevValue,
              email: true,
            };
          });
          console.log("user not found");
        } else if (res.data === false) {
          setLoginTooltip((prevValue) => {
            return {
              ...prevValue,
              password: true,
            };
          });
          console.log("wrong password");
        } else {
          setLoginTooltip({
            email: false,
            password: false,
            emptyFields: false,
          });
          localStorage.setItem("auth-token", res.data.token);
          console.log("you're logged");
          window.location.reload();
        }
      });
    }
  };

  //-----------------HANDLING REGISTER INPUTS----------------------

  const registerHandler = (event) => {
    const { name, value } = event.target;

    setRegister((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });

    setRegisterTooltip({
      email: false,
      password: false,
      password2: false,
      userExists: false,
      emptyFields: false,
      emptyFields2: false,
    });
  };

  const registerCheckboxHandler = (event) => {
    setRegisterCheckbox(!registerCheckbox);
  };

  const registerTooltipHandler = {
    emailTooltip: function (event) {
      let emailValidation = emailValidator.validate(event.target.value);
      if (!emailValidation) {
        setRegisterTooltip((prevValue) => {
          return {
            ...prevValue,
            email: true,
          };
        });
      } else if (emailValidation) {
        setRegisterTooltip((prevValue) => {
          return {
            ...prevValue,
            email: false,
          };
        });
      }
      if (event.target.value === "") {
        setRegisterTooltip((prevValue) => {
          return {
            ...prevValue,
            email: false,
          };
        });
      }
    },
    passwordTooltip: function (event) {
      let passwordError = passwordSchema.validate(event.target.value, {
        list: true,
      });
      console.log(passwordError);
      if (passwordError[0]) {
        setRegisterTooltip((prevValue) => {
          return {
            ...prevValue,
            password: true,
          };
        });
        switch (passwordError[0]) {
          case "min":
            setRegPasswordError("deve conter pelo menos 8 dígitos");
            break;
          case "max":
            setRegPasswordError("deve conter no máximo 50 dígitos");
            break;
          case "uppercase":
            setRegPasswordError("deve conter pelo menos 1 caracter maiúsculo");
            break;
          case "lowercase":
            setRegPasswordError("deve conter pelo menos 1 caracter minúsculo");
            break;
          case "digits":
            setRegPasswordError("deve conter pelo menos 1 número");
            break;
          case "spaces":
            setRegPasswordError("não deve conter espaços");
            break;
          case "oneOf":
            setRegPasswordError(
              "não utilize senhas fáceis como: seu email, seu nome, 'Senha123', 'Passw0rd', etc... "
            );
            break;
          default:
            setRegPasswordError(null);
        }
      } else if (!passwordError[0]) {
        setRegisterTooltip((prevValue) => {
          return {
            ...prevValue,
            password: false,
          };
        });
      }
      if (event.target.value === "") {
        setRegisterTooltip((prevValue) => {
          return {
            ...prevValue,
            password: false,
          };
        });
      }
    },
    passwordTooltip2: function (event) {
      if (event.target.value !== register.newUserPassword) {
        setRegisterTooltip((prevValue) => {
          return {
            ...prevValue,
            password2: true,
          };
        });
      } else if (event.target.value === register.newUserPassword) {
        setRegisterTooltip((prevValue) => {
          return {
            ...prevValue,
            password2: false,
          };
        });
      }
      if (event.target.value === "") {
        setRegisterTooltip((prevValue) => {
          return {
            ...prevValue,
            password2: false,
          };
        });
      }
    },
  };

  const handleEmailCheck = () => {
    const { fName, lName, email } = register;

    if (!fName || !lName || !email) {
      setRegisterTooltip((prevValue) => {
        return {
          ...prevValue,
          emptyFields: true,
        };
      });
    } else if (!emailValidator.validate(email)) {
      setRegisterTooltip((prevValue) => {
        return {
          ...prevValue,
          email: true,
        };
      });
    } else {
      axios
        .post("http://localhost:5000/users/checkEmail", { email })
        .then((res) => {
          if (res.data.userExists === true) {
            setRegisterTooltip((prevValue) => {
              return {
                ...prevValue,
                userExists: true,
              };
            });
          } else {
            switchForms();
          }
        });

      setRegisterTooltip((prevValue) => {
        return {
          ...prevValue,
          emptyFields: false,
        };
      });
    }
  };

  const handleRegisterClick = (event) => {
    const newUser = {
      fName: register.fName,
      lName: register.lName,
      email: register.email,
      password: register.newUserPassword,
      remember: registerCheckbox,
    };

    if (!register.newUserPassword || !register.newUserPassword2) {
      setRegisterTooltip((prevValue) => {
        return {
          ...prevValue,
          emptyFields2: true,
        };
      });
    } else if (!passwordSchema.validate(register.newUserPassword)) {
      setRegisterTooltip((prevValue) => {
        return {
          ...prevValue,
          password: true,
        };
      });
    } else if (register.newUserPassword !== register.newUserPassword2) {
      setRegisterTooltip((prevValue) => {
        return {
          ...prevValue,
          password2: true,
        };
      });
    } else {
      axios
        .post("http://localhost:5000/users/registration", newUser)
        .then((res) => {
          if (res.data.exists === true) {
            console.log("user already exists");
          } else {
            localStorage.setItem("auth-token", res.data.token);
            window.location.reload();
          }
        });

      setRegisterTooltip((prevValue) => {
        return {
          ...prevValue,
          emptyFields2: false,
        };
      });
    }
  };

  // ---------------------TO BE RENDERED--------------------
  return (
    <div className="login-container">
      <div className="lines-block login" id="lines-block">
        <div className="vertical-left-line" />
        <div className="vertical-right-line" />
        <div className="horizontal-top-line" />
        <div className="horizontal-bottom-line" id="horizontal-bottom-line" />
        <LoginFrame
          recoveryTooltip={recoveryTooltip}
          recoveryInput={recoveryInput}
          login={login}
          checkbox={loginCheckbox}
          emailTooltip={loginTooltip.email}
          passwordTooltip={loginTooltip.password}
          emptyFields={loginTooltip.emptyFields}
          loginHandler={loginHandler}
          checkboxHandler={loginCheckboxHandler}
          handleLoginClick={handleLoginClick}
          notRegistered={notRegistered}
          passwordRecovery={passwordRecovery}
          recoveryHandler={recoveryHandler}
          setRecoveryTooltip={removeTooltip}
        />
        <RegisterFrame
          fForm={fForm}
          lForm={lForm}
          emailTooltip={registerTooltip.email}
          passwordTooltip={registerTooltip.password}
          passwordTooltip2={registerTooltip.password2}
          userExists={registerTooltip.userExists}
          emptyFields={registerTooltip.emptyFields}
          emptyFields2={registerTooltip.emptyFields2}
          passwordError={regPasswordError}
          register={register}
          checkbox={registerCheckbox}
          emailTooltipHandler={registerTooltipHandler.emailTooltip}
          passwordTooltipHandler={registerTooltipHandler.passwordTooltip}
          passwordTooltipHandler2={registerTooltipHandler.passwordTooltip2}
          registerHandler={registerHandler}
          checkboxHandler={registerCheckboxHandler}
          handleRegisterClick={handleRegisterClick}
          handleEmailCheck={handleEmailCheck}
          switchForms={switchForms}
          switchForms2={switchForms2}
        />
      </div>
    </div>
  );
}

export default Login;
