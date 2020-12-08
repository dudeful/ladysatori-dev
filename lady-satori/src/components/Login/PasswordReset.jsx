import React from "react";
import axios from "axios";
import useAxios from "axios-hooks";
import Tippy from "@tippyjs/react";
import Error400 from "../Errors/Error400";
import Error429 from "../Errors/Error429";
import Loading from "../Errors/Loading";
import { LinkExpired } from "../Errors/LinkExpired";
import passwordValidator from "password-validator";
import passwordBlacklist from "./passwordBlacklist";

const PasswordReset = () => {
  const [newPassword, setNewPassword] = React.useState({
    password: "",
    confirmPassword: "",
  });

  const [passwordTooltip, setPasswordTooltip] = React.useState({
    password: false,
    confirmPassword: false,
    emptyFields: false,
  });

  const [passwordError, setPasswordError] = React.useState(null);

  //get the user object on the server
  const [{ data, loading, error }] = useAxios(
    "http://localhost:5000/users" + window.location.pathname
  );

  //handling loading delay and bad requests (400) errors.
  if (loading) return <Loading />;

  if (error) {
    //check if it is an rate-limiting error
    if (error.toJSON().message.split(" ").slice(-1)[0] === "429") {
      //if afirmative, send custom "too many requests" error message
      return <Error429 />;
    } else {
      return <Error400 />;
    }
  }

  if (!data.user) return <LinkExpired />;
  // if (linkExpired) return <LinkExpired />;

  //handling inputs
  const inputHandler = (event) => {
    const { name, value } = event.target;

    setNewPassword((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });

    setPasswordTooltip({
      password: false,
      confirmPassword: false,
      emptyFields: false,
    });
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
    .oneOf(passwordBlacklist(data.user)); // Blacklist these values

  const passwordValidation = {
    passwordTooltip: function (event) {
      let passwordError = passwordSchema.validate(event.target.value, {
        list: true,
      });
      if (passwordError[0]) {
        setPasswordTooltip((prevValue) => {
          return {
            ...prevValue,
            password: true,
          };
        });
        switch (passwordError[0]) {
          case "min":
            setPasswordError("deve conter pelo menos 8 dígitos; ");
            break;
          case "max":
            setPasswordError("deve conter no máximo 50 dígitos; ");
            break;
          case "uppercase":
            setPasswordError("deve conter pelo menos 1 caracter maiúsculo; ");
            break;
          case "lowercase":
            setPasswordError("deve conter pelo menos 1 caracter minúsculo; ");
            break;
          case "digits":
            setPasswordError("deve conter pelo menos 1 número; ");
            break;
          case "spaces":
            setPasswordError("não deve conter espaços; ");
            break;
          case "oneOf":
            setPasswordError(
              "não utilize senhas fáceis como: seu email, seu nome, 'Senha123', 'Passw0rd', etc... "
            );
            break;
          default:
            setPasswordError(null);
        }
      } else if (!passwordError[0]) {
        setPasswordTooltip((prevValue) => {
          return {
            ...prevValue,
            password: false,
          };
        });
      }
      if (event.target.value === "") {
        setPasswordTooltip((prevValue) => {
          return {
            ...prevValue,
            password: false,
          };
        });
      }
    },
    passwordTooltip2: function (event) {
      if (event.target.value !== newPassword.password) {
        setPasswordTooltip((prevValue) => {
          return {
            ...prevValue,
            confirmPassword: true,
          };
        });
      } else if (event.target.value === newPassword.password) {
        setPasswordTooltip((prevValue) => {
          return {
            ...prevValue,
            confirmPassword: false,
          };
        });
      }
      if (event.target.value === "") {
        setPasswordTooltip((prevValue) => {
          return {
            ...prevValue,
            confirmPassword: false,
          };
        });
      }
    },
  };

  //sending the new password to the server
  const reset = () => {
    const resetData = { user: data.user, newPassword };

    setPasswordTooltip({
      password: false,
      confirmPassword: false,
      emptyFields: false,
    });

    if (!newPassword.password || !newPassword.confirmPassword) {
      setPasswordTooltip((prevValue) => {
        return {
          ...prevValue,
          emptyFields: true,
        };
      });
    } else if (!passwordSchema.validate(newPassword.password)) {
      setPasswordTooltip((prevValue) => {
        return {
          ...prevValue,
          password: true,
        };
      });
    } else if (newPassword.password !== newPassword.confirmPassword) {
      setPasswordTooltip((prevValue) => {
        return {
          ...prevValue,
          confirmPassword: true,
        };
      });
    } else {
      axios
        .patch(
          "http://localhost:5000/users" + window.location.pathname,
          resetData
        )
        .then((res) => {
          if (res.data.user === false) {
            window.location.reload();
          } else if (res.data.passwordError) {
            //check which requirements the password fails to fit and creates a custom message
            switch (res.data.passwordError[0]) {
              case "min":
                setPasswordError("deve conter pelo menos 8 dígitos; ");
                alert("senha deve conter pelo menos 8 dígitos");
                break;
              case "max":
                setPasswordError("deve conter no máximo 50 dígitos; ");
                alert("senha deve conter no máximo 50 dígitos");
                break;
              case "uppercase":
                setPasswordError(
                  "deve conter pelo menos 1 caracter maiúsculo; "
                );
                alert("senha deve conter pelo menos 1 caracter maiúsculo");
                break;
              case "lowercase":
                setPasswordError(
                  "deve conter pelo menos 1 caracter minúsculo; "
                );
                alert("senha deve conter pelo menos 1 caracter minúsculo");
                break;
              case "digits":
                setPasswordError("deve conter pelo menos 1 número; ");
                alert("senha deve conter pelo menos 1 número");
                break;
              case "spaces":
                setPasswordError("não deve conter espaços; ");
                alert("senha não deve conter espaços");
                break;
              case "oneOf":
                setPasswordError(
                  "não utilize senhas fáceis como: seu email, seu nome, 'Senha123', 'Passw0rd', etc... "
                );
                alert(
                  "não utilize senhas fáceis como: seu email, seu nome, 'Senha123', 'Passw0rd', etc..."
                );
                break;
              default:
                setPasswordError(null);
            }

            setPasswordTooltip((prevValue) => {
              return {
                ...prevValue,
                password: true,
              };
            });
          }
          //if any issue has been found, sets a token on local-storage
          else {
            localStorage.setItem("auth-token", res.data.token);
            window.location = "/";
          }
        });
    }
  };

  // -----------------------TO BE RENDERED-------------------------

  return (
    <div className="reset-container">
      <div className="reset-form">
        <p className="reset-home-link">
          <a className="reset-home-link" href="/">
            lady Satori
          </a>
        </p>
        <p className="heading text-dark">REDEFINIR SENHA</p>
        <img
          src="/images/password-reset.jpg"
          alt="https://www.freepik.com/vectors/technology"
        />
        <div className="reset-input">
          <Tippy
            interactive={true}
            allowHTML={true}
            theme="material"
            visible={passwordTooltip.password}
            content={
              <span className="text-light">
                &#x274C; {passwordError}
                <br />
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
              name="password"
              onChange={inputHandler}
              onBlur={passwordValidation.passwordTooltip}
              type="password"
              className="mt-4 form-control"
              placeholder="nova senha"
              aria-label="nova-senha"
              aria-describedby="basic-addon1"
              value={newPassword.password}
              autoFocus
            />
          </Tippy>
          <Tippy
            theme="material"
            visible={passwordTooltip.confirmPassword}
            content={
              <span className="text-light">
                ei ei ei! as duas senhas precisam ser iguais &#129488;
              </span>
            }
          >
            <input
              name="confirmPassword"
              onChange={inputHandler}
              onBlur={passwordValidation.passwordTooltip2}
              type="password"
              className="mt-3 form-control"
              placeholder="confirmar senha"
              aria-label="confirmar-senha"
              aria-describedby="basic-addon1"
              value={newPassword.confirmPassword}
            />
          </Tippy>

          <span className="text-muted">
            acabou de lembrar? <a href="/login">login</a>
          </span>

          <Tippy
            theme="material"
            visible={passwordTooltip.emptyFields}
            content={
              <span className="text-light">
                oops! parece que existem campos vazios &#129488;
              </span>
            }
            placement="bottom"
            arrow={false}
          >
            <button
              onClick={reset}
              className="btn btn-outline-info btn-block btn-sm mt-4"
            >
              Redefinir Senha
            </button>
          </Tippy>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
