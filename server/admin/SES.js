const SES = require("aws-sdk/clients/ses");
const ses = new SES({ apiVersion: "2010-12-01" });

const createTemplate = (template) => {
  var params = {
    Template: {
      TemplateName: template.name,
      HtmlPart: template.html,
      SubjectPart: template.subject,
      TextPart: template.text,
    },
  };
  ses.createTemplate(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
};

const deleteTemplate = (template) => {
  var params = {
    TemplateName: template,
  };
  ses.deleteTemplate(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
};

const sendTemplatedEmail = (data) => {
  const { toAddresses, templateName, name, home_link, recovery_link, login_page_link } = data;

  var params = {
    Destination: {
      ToAddresses: toAddresses,
    },
    Source: "Lady Satori <rellumnyar@gmail.com>",
    Template: templateName,
    TemplateData: `{ "name": "${name}", "home_link": "${home_link}", "recovery_link": "${recovery_link}", "login_page_link": "${login_page_link}"}`,
    ConfigurationSetName: "ladysatori-ResetPassword",
    ReplyToAddresses: ["rellumnyar@hotmail.com"],
    ReturnPath: "rellumnyar@hotmail.com",
  };

  ses.sendTemplatedEmail(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
};

module.exports = { createTemplate, deleteTemplate, sendTemplatedEmail };
