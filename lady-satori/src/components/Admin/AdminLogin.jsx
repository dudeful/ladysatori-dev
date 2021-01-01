import "../../styles/AdminLogin.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/material.css";
import "tippy.js/themes/light.css";
import React from "react";
import Axios from "axios";
import LoginFrame from "./LoginFrame";
import emailValidator from "email-validator";

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

  const [loginTooltip, setLoginTooltip] = React.useState({
    email: false,
    password: false,
    emptyFields: false,
  });

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
        // "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/admin/reset/password-reset",
        "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/admin/reset/password-reset",
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
            }, 4000);
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

  const handleLoginClick = (event) => {
    const User = {
      email: login.email,
      password: login.password,
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
        // "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/admin/auth/login",
        "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/admin/auth/login",
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
            setLoginTooltip({
              email: false,
              password: false,
              emptyFields: false,
            });

            sessionStorage.setItem("auth-token", res.data.token);
            console.log("you're logged");
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // ---------------------TO BE RENDERED--------------------
  return (
    <div className="adminlogin-body">
      <div className="adminlogin-container">
        <LoginFrame
          login={login}
          emailTooltip={loginTooltip.email}
          passwordTooltip={loginTooltip.password}
          emptyFields={loginTooltip.emptyFields}
          resetTooltip={resetTooltip}
          resetInput={resetInput}
          removeTooltip={removeTooltip}
          resetHandler={resetHandler}
          passwordReset={passwordReset}
          loginHandler={loginHandler}
          handleLoginClick={handleLoginClick}
        />
      </div>
    </div>
  );
}

export default LoginComponent;
