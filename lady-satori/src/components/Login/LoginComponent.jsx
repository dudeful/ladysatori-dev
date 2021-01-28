import "../../styles/Login.css";
import "tippy.js/dist/tippy.css";
// import "tippy.js/themes/material.css";
import "tippy.js/themes/light.css";
import React from "react";
import Axios from "axios";
// import Error400 from "../Errors/Error400";
import LoginFrame from "./LoginFrame";
import RegisterFrame from "./RegisterFrame";
import emailValidator from "email-validator";
import passwordValidator from "password-validator";
import passwordBlacklist from "./passwordBlacklist";

function LoginComponent(props) {
  const [resetTooltip, setResetTooltip] = React.useState({
    notRegistered: false,
    invalid: false,
    emailSent: false,
  });
  const [resetInput, setResetInput] = React.useState("");

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
    email2: false,
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
      email2: false,
      password: false,
      password2: false,
      userExists: false,
      emptyFields: false,
      emptyFields2: false,
    });
    setRegister((prevValue) => {
      return {
        ...prevValue,
        newUserPassword: "",
        newUserPassword2: "",
      };
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
    .max(50) // Maximum length 50
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

  //-----------------PASSWORD RESET--------------------------

  const removeTooltip = () => {
    setResetTooltip({
      notRegistered: false,
      invalid: false,
      emailSent: false,
    });
  };

  const resetHandler = (event) => {
    setResetInput(event.target.value);
    removeTooltip();
  };

  const passwordReset = () => {
    if (emailValidator.validate(resetInput)) {
      Axios.post(
        "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/users/password-reset",
        {
          email: resetInput,
        }
      )
        .then((res) => {
          if (res.data.validEmail === false) {
            alert("endereço de email inválido");
            setResetTooltip({
              notRegistered: false,
              invalid: true,
              emailSent: false,
            });
          } else if (res.data.userExists === false) {
            setResetTooltip({
              notRegistered: true,
              invalid: false,
              emailSent: false,
            });
          } else {
            console.log(res.data);
            setResetTooltip({
              notRegistered: false,
              invalid: false,
              emailSent: true,
            });
            setTimeout(() => {
              window.location.reload();
            }, 6000);
            //send email through emailing provider
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setResetTooltip({
        notRegistered: false,
        invalid: true,
        emailSent: false,
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
      Axios.post(
        "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/auth/login",
        // "http://localhost:5000/auth/login",
        User
      )
        .then((res) => {
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
            if (loginCheckbox) {
              localStorage.setItem("auth-token", res.data.token);
              sessionStorage.removeItem("auth-token");
              console.log("you're logged");
              window.location.reload();
            } else {
              sessionStorage.setItem("auth-token", res.data.token);
              localStorage.removeItem("auth-token");
              console.log("you're logged");
              window.location.reload();
            }
            setLoginTooltip({
              email: false,
              password: false,
              emptyFields: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
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
      email2: false,
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
            setRegPasswordError("deve conter pelo menos 8 dígitos; ");
            break;
          case "max":
            setRegPasswordError("deve conter no máximo 50 dígitos; ");
            break;
          case "uppercase":
            setRegPasswordError(
              "deve conter pelo menos 1 caracter maiúsculo; "
            );
            break;
          case "lowercase":
            setRegPasswordError(
              "deve conter pelo menos 1 caracter minúsculo; "
            );
            break;
          case "digits":
            setRegPasswordError("deve conter pelo menos 1 número; ");
            break;
          case "spaces":
            setRegPasswordError("não deve conter espaços; ");
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
      Axios.post(
        "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/users/checkEmail",
        { email }
      )
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
        })
        .catch((err) => {
          console.log(err);
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
      Axios.post(
        "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/users/registration",
        newUser
      )
        .then((res) => {
          //
          //checks if the email is already registered
          if (res.data.exists === true) {
            console.log("este email já está cadastrado!");
            alert(
              "Este email já está cadastrado! Caso não lembre sua senha, click em 'recuperar' na página de Login."
            );
            window.location.reload();

            //performs server-side validation and checks if the middleware validator found any issues
          } else if (res.data.validation) {
            //
            //check if the email is a valid email
            if (!res.data.validation.validEmail) {
              console.log("endereço de email inválido");

              //sets the Tippy visibility on RegisterFrame component to true
              setRegisterTooltip((prevValue) => {
                return {
                  ...prevValue,
                  email2: true,
                };
              });
              alert("endereço de email inválido");
              setTimeout(() => {
                window.location.reload();
              }, 5000);

              //check if the password fits the requirements
            } else if (res.data.validation.passwordError[0]) {
              //
              //check which requirements the password fails to fit and creates a custom message
              switch (res.data.validation.passwordError[0]) {
                case "min":
                  setRegPasswordError("deve conter pelo menos 8 dígitos; ");
                  alert("senha deve conter pelo menos 8 dígitos");
                  break;
                case "max":
                  setRegPasswordError("deve conter no máximo 50 dígitos; ");
                  alert("senha deve conter no máximo 50 dígitos");
                  break;
                case "uppercase":
                  setRegPasswordError(
                    "deve conter pelo menos 1 caracter maiúsculo; "
                  );
                  alert("senha deve conter pelo menos 1 caracter maiúsculo");
                  break;
                case "lowercase":
                  setRegPasswordError(
                    "deve conter pelo menos 1 caracter minúsculo; "
                  );
                  alert("senha deve conter pelo menos 1 caracter minúsculo");
                  break;
                case "digits":
                  setRegPasswordError("deve conter pelo menos 1 número; ");
                  alert("senha deve conter pelo menos 1 número");
                  break;
                case "spaces":
                  setRegPasswordError("não deve conter espaços; ");
                  alert("senha não deve conter espaços");
                  break;
                case "oneOf":
                  setRegPasswordError(
                    "não utilize senhas fáceis como: seu email, seu nome, 'Senha123', 'Passw0rd', etc... "
                  );
                  alert(
                    "não utilize senhas fáceis como: seu email, seu nome, 'Senha123', 'Passw0rd', etc..."
                  );
                  break;
                default:
                  setRegPasswordError(null);
              }

              //sets the Tippy visibility on RegisterFrame component to true
              setRegisterTooltip((prevValue) => {
                return {
                  ...prevValue,
                  password: true,
                };
              });
            }

            //if any issue has been found, sets a cookie on local-storage
          } else {
            if (registerCheckbox) {
              sessionStorage.removeItem("auth-token");
              localStorage.setItem("auth-token", res.data.token);
              console.log("you're logged");
              window.location.reload();
            } else {
              localStorage.removeItem("auth-token");
              sessionStorage.setItem("auth-token", res.data.token);
              console.log("you're logged");
              window.location.reload();
            }
          }
        })
        .catch((err) => {
          console.log(err);
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
          login={login}
          checkbox={loginCheckbox}
          emailTooltip={loginTooltip.email}
          passwordTooltip={loginTooltip.password}
          emptyFields={loginTooltip.emptyFields}
          resetTooltip={resetTooltip}
          resetInput={resetInput}
          removeTooltip={removeTooltip}
          resetHandler={resetHandler}
          passwordReset={passwordReset}
          loginHandler={loginHandler}
          checkboxHandler={loginCheckboxHandler}
          handleLoginClick={handleLoginClick}
          notRegistered={notRegistered}
        />
        <RegisterFrame
          fForm={fForm}
          lForm={lForm}
          emailTooltip={registerTooltip.email}
          emailTooltip2={registerTooltip.email2}
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

export default LoginComponent;
