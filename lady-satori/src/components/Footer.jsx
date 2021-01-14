function Footer() {
  return (
    <div className="home-footer">
      <p className="brand">lady Satori</p>
      <div className="footer-container row">
        <div className="col-md-6">
          <p className="font-weight-bold">contato@ladysatori.com.br</p>
          <p>
            1600 Pennsylvania Avenue NW,
            <br /> Washington, DC
            <br /> 20500,
            <br /> United States
          </p>
        </div>
        <div className="social-icons col-md-6">
          <a
            href="https://www.facebook.com/sadhguru"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com/SadhguruJV"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://wa.me/5521995165858"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
          <a
            href="https://www.youtube.com/user/sadhguru"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-youtube"></i>
          </a>
        </div>
        <br />
        <p className="m-auto">&copy; 2021 Lady Satori</p>
      </div>
    </div>
  );
}

export default Footer;
