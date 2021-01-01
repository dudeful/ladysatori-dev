import Tippy from "@tippyjs/react";

export const PasswordResetModal = (props) => {
  return (
    <div
      className="modal fade mt-5"
      id="passwordResetModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              style={{ fontFamily: "Montserrat" }}
              className="modal-title text-info"
              id="exampleModalLabel"
            >
              Recuperar Senha
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p
              className="text-dark"
              style={{ fontFamily: "Montserrat", fontWeight: "500" }}
            >
              Um email com instruções será enviado para você
            </p>
            <Tippy
              onClickOutside={props.removeTooltip}
              theme="material"
              visible={props.resetTooltip.notRegistered}
              content={
                <span className="text-warning">
                  hmm.. este email não está cadastrado &#129488;
                </span>
              }
              arrow={false}
              placement="bottom-start"
            >
              <Tippy
                onClickOutside={props.removeTooltip}
                theme="material"
                visible={props.resetTooltip.invalid}
                content={
                  <span className="text-warning">
                    este não parece ser um email válido &#129488;
                  </span>
                }
                arrow={false}
                placement="bottom-start"
              >
                <Tippy
                  onClickOutside={props.removeTooltip}
                  theme="light"
                  visible={props.resetTooltip.emailSent}
                  content={
                    <span className="text-danger">
                      um email com instruções foi enviado para você &#x1F609;
                    </span>
                  }
                  arrow={false}
                  placement="bottom-start"
                >
                  <input
                    className="userInput mb-3 mt-3"
                    onChange={props.resetHandler}
                    type="email"
                    name="email"
                    value={props.resetInput}
                    aria-describedby="emailHelp"
                    placeholder="endereço de email"
                    autoFocus
                  />
                </Tippy>
              </Tippy>
            </Tippy>
          </div>
          <div className="modal-footer">
            <button
              onClick={props.passwordReset}
              type="button"
              className="btn btn-outline-info btn-sm w-25"
            >
              enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
