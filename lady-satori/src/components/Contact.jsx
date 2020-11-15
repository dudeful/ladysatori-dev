import React, { useState } from 'react';
import emailjs from 'emailjs-com';

function Contact() {

    const [register, setRegister] = useState({
        name: '',
        email: '',
    });

    const [messageSent, setMessageSent] = useState('');

    function messageHandler(ok) {
        if(ok){
            setMessageSent(<p className="text-muted font-weight-bold text-left">Mensagem enviada com sucesso! Responderei em breve. &#x1F60A;</p>);
        } else{
            setMessageSent(<p className="text-muted font-weight-bold text-left">Ops! Não conseguimos enviar sua mensagem no momento <span role='img' aria-label='detective-emoji'>&#x1F62C;</span><br/> Por favor tente mais tarde.</p>);
        }
    };

    function handleChange(event) {
        const { name, value } = event.target;
    
        setRegister(prevValue => {
            return {
            ...prevValue,
            [name]: value
            };
        })
    }

    function sendEmail(event){
        event.preventDefault();

        emailjs.sendForm('lady-satori-gmail', 'template_476wsql', event.target, 'user_KLCjGwmW2j86aUUs0AFQP')
          .then((result) => {
              console.log(result.text);
              if(result.text === 'OK'){
                event.target.reset();
                messageHandler(true);
              }
          }, (error) => {
              console.log(error.text);
              messageHandler(false);
          });
    }

    return(
    <div>

    <div id="get-in-touch">
        <p>entre em contato</p>
    </div>

    <div className="home-contact row">
        <div className="home-container contact-form col-md-5">

            <form onSubmit={sendEmail}>
                <h3 className="mb-2"><span>Olá,</span> {register.name}</h3>
                <h5 className="text-muted mb-3">{register.email}</h5>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Nome</label>
                    <input type="text" onChange={handleChange} className="form-control" id="contact-name" name="name" value={register.name} placeholder="John Doe" required />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Endereço de E-mail</label>
                    <input type="email" onChange={handleChange} className="form-control" id="contact-email" name="email" value={register.email} placeholder="nome@exemplo.com" required />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Mensagem</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="message" placeholder="Olá! Adoraria saber mais sobre..." required></textarea>
                </div>
                {messageSent === '' ? '' : messageSent}
                <button type="submit" className="btn btn-outline-info btn-block">Enviar</button>
                <div>
                <p>ou entre em contato pelo whatsapp</p>
                <a href="https://wa.me/5521995165858" target="_blank" rel="noreferrer"><img className="whatsapp-icon" src="/images/whatsapp.png" alt="..." /></a>
                </div>
            </form>

        </div>
        <img className="contact-profile-pic col-md-3" src="/images/dwight.jpg" alt="..." />
    </div>
    </div>
    )
};

export default Contact;