const template = {
  template: `<html>\n
<head>\n
<title>\n</title>\n
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n
<meta name="viewport" content="width=device-width, initial-scale=1">\n
<meta http-equiv="X-UA-Compatible" content="IE=edge" />\n
<style type="text/css">\n
    @media screen {\n
		@font-face {\n
		  font-family: 'Lato';\n
		  font-style: normal;\n
		  font-weight: 400;\n
		  src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');\n
		}\n
		@font-face {\n
		  font-family: 'Lato';\n
		  font-style: normal;\n
		  font-weight: 700;\n
		  src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');\n
		}\n
		@font-face {\n
		  font-family: 'Lato';\n
		  font-style: italic;\n
		  font-weight: 400;\n
		  src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');\n
		}\n
		@font-face {\n
		  font-family: 'Lato';\n
		  font-style: italic;\n
		  font-weight: 700;\n
		  src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');\n
		}\n
    }\n
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }\n
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }\n
    img { -ms-interpolation-mode: bicubic; }\n
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }\n
    table { border-collapse: collapse !important; }\n
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }\n
    a[x-apple-data-detectors] {\n
        color: inherit !important;\n
        text-decoration: none !important;\n
        font-size: inherit !important;\n
        font-family: inherit !important;\n
        font-weight: inherit !important;\n
        line-height: inherit !important;\n
    }\n
    div[style*="margin: 16px 0;"] { margin: 0 !important; }\n
    @media only screen and (max-width: 415px) {\n
        table {\n
        max-width: 375px;\n
        margin: auto;\n
        }\n
    }\n
        @media only screen and (max-width: 375px) {\n
        table {\n
        max-width: 290px;\n
        margin: auto;\n
        }\n
    }    @media only screen and (max-width: 320px) {\n
        table {\n
        max-width: 260px;\n
        margin: auto;\n
        }\n
    }\n
</style>\n
</head>\n
<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">\n
<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">\n
    Sua senha acabou de ser alterada!\n
</div>\n
<div class="email-template">\n
<table border="0" cellpadding="0" cellspacing="0" width="100%">\n
    <tr>\n
        <td bgcolor="#7c72dc" align="center">\n
            <table border="0" cellpadding="0" cellspacing="0" width="480" >\n
                <tr>\n
                    <td align="center" valign="top" style="padding: 40px 10px 40px 10px;">\n
                        <a href={{home_link}} target="_blank" rel="noreferrer">\n
                            <img alt="Logo" src="https://www.pinclipart.com/picdir/big/169-1692394_yoga-modules-yoga-icon-clipart.png" width="33.3%" height="100" style="display: block;  font-family: 'Lato', Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0">\n
                        </a>\n
                    </td>\n
                </tr>\n
            </table>\n
        </td>\n
    </tr>\n
    <tr>\n
        <td bgcolor="#7c72dc" align="center" style="padding: 0px 10px 0px 10px;">\n
            <table border="0" cellpadding="0" cellspacing="0" width="480" >\n
                <tr>\n
                    <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">\n
                      <h1 style="font-size: 32px; font-weight: 400; margin: 0;">\nSenha Alterada</h1>\n
                    </td>\n
                </tr>\n
            </table>\n
        </td>\n
    </tr>\n
    <tr>\n
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">\n
            <table border="0" cellpadding="0" cellspacing="0" width="480" >\n
              <tr>\n
                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >\n
                  <p style="margin: 0;">Sua senha foi alterada com sucesso! <p/> 
                  <p>Caso não tenha sido você, por favor <b>altere sua senha imediatamente. </b> 🏃‍♀&#x1F4A8;</p>\n
                </td>\n
              </tr>\n
              <tr>\n
                <td bgcolor="#ffffff" align="left">\n
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">\n
                    <tr>\n
                      <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">\n
                        <table border="0" cellspacing="0" cellpadding="0">\n
                          <tr>\n
                              <td align="center" style="border-radius: 3px;" bgcolor="#7c72dc"><a href={{login_page_link}} target="_blank" rel="noreferrer" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #7c72dc; display: inline-block;">Alterar Senha</a></td>\n
                          </tr>\n
                        </table>\n
                      </td>\n
                    </tr>\n
                  </table>\n
                </td>\n
              </tr>\n
            </table>\n
        </td>\n
    </tr>\n
    <tr>\n
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">\n
            <table border="0" cellpadding="0" cellspacing="0" width="100%" >\n
                <tr>\n
                  <td bgcolor="#111111" align="left" style="padding: 40px 30px 20px 30px; color: #ffffff; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >\n
                    <h2 style="font-size: 24px; font-weight: 400; margin: 0;">Não consegue clicar no botão acima?</h2>\n
                  </td>\n
                </tr>\n
                <tr>\n
                  <td bgcolor="#111111" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >\n
                    <p style="margin: 0;">\nClique no link abaixo ou copie/cole no seu navegador.</p>\n
                  </td>\n
                </tr>\n
                <tr>\n
                  <td bgcolor="#111111" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >\n
                    <p style="margin: 0;">\n
                    <a href={{login_page_link}} target="_blank" rel="noreferrer" style="color: #7c72dc;">{{login_page_link}}</a></p>\n
                  </td>\n
                </tr>\n
            </table>\n
        </td>\n
    </tr>\n
    <tr>\n
        <td bgcolor="#f4f4f4" align="center" style="padding: 20;">\n
        </td>\n
    </tr>\n
    <tr>\n
        <td bgcolor="#f4f4f4" align="center" style="padding: 5px 10px 0px 10px;">\n
            <table border="0" cellpadding="0" cellspacing="0" width="480" >\n
              <tr>\n
                <td bgcolor="#C6C2ED" align="center" style="padding: 20px 30px 20px 30px; border-radius: 2px 2px 2px 2px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;" >\n
                  <p style="margin: 0;">\nVocê está recebendo este email porque sua senha acabou de ser alterada. Se foi você quem realizou a alteração, <span style="color: #111111; font-weight: 700;"><u>por favor ignore este email</u></span>.</p>\n
                </td>\n
              </tr>\n
              <tr>\n
                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >\n
                  <p style="margin-top: 30px;">\n1600 Pennsylvania Avenue NW · Washington, D.C</p>\n
                </td>\n
              </tr>\n
            </table>\n
        </td>\n
    </tr>\n
</table>\n
</div>\n
</body>\n
</html>\n`,
};

module.exports = template;
