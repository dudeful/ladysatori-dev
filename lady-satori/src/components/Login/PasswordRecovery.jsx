import Tippy from "@tippyjs/react";

export const PasswordRecovery = (props) => {
  return (
    <div
      className="modal fade"
      id="passwordRecovery"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
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
              onClickOutside={props.setRecoveryTooltip}
              theme="material"
              visible={props.recoveryTooltip}
              content={
                <span className="text-light">
                  hmm.. tem certeza que o email está certo? <br /> este email
                  não está cadastrado &#129488;
                </span>
              }
              arrow={false}
              placement="bottom-start"
            >
              <input
                className="userInput mb-3 mt-3"
                onChange={props.recoveryHandler}
                type="email"
                name="email"
                value={props.recoveryInput}
                aria-describedby="emailHelp"
                placeholder="endereço de email"
                autoFocus
              />
            </Tippy>
          </div>
          <div className="modal-footer">
            <button
              onClick={props.passwordRecovery}
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
