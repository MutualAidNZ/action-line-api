import assert from 'assert';
import mailgun from 'mailgun-js';
import { loadTemplate } from '../helpers/emailTemplates';
import logger from './logger';

const log = logger.child({ module: 'email' });

// eslint-disable-next-line import/prefer-default-export
export async function sendTemplatedEmail({
  templateName,
  email,
  subject,
  data,
}) {
  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
    // testMode: true,
  });

  if (process.env.FLAG_DISABLE_EMAIL === false) {
    log.info('Email is disabled via configuration. Not sending.');
    return;
  }

  assert(email || data.email, 'please specify an email address');
  assert(subject, 'please specify a subject');
  assert(templateName, 'please specify a template');

  const { compiledTextTemplate, compiledHtmlTemplate } = await loadTemplate({
    templateName,
  });

  const subjectPreamble =
    process.env.NODE_ENV === 'production' ? '' : '[DEVELOPMENT] ';

  const emailData = {
    subject: `${subjectPreamble} ${subject}`,
    from: `${process.env.MAILGUN_FROM_NAME} <${process.env.MAILGUN_FROM_EMAIL}>`,
    to: email || data.email,
    text: compiledTextTemplate ? compiledTextTemplate.render(data) : null,
  };

  if (compiledHtmlTemplate) {
    emailData.html = compiledHtmlTemplate.render(data);
  }

  return mg
    .messages()
    .send(emailData)
    .then((body) => {
      log.info(`Sent ${templateName} email to ${email || data.email}`, {
        body,
        data,
        emailData,
      });
      return body;
    })
    .catch((error) => {
      log.error(error);
      throw error;
    });
}

// export async function sendPreCompiledEmail({ email, subject, text, html }) {
//   const mg = mailgun({
//     apiKey: process.env.MAILGUN_API_KEY,
//     domain: process.env.MAILGUN_DOMAIN,
//     // testMode: true,
//   });

//   if (config.get('FLAG_ENABLE_EMAIL') === false) {
//     log.info('Email is disabled via configuration. Not sending.');
//     return;
//   }

//   assert(email, 'please specify an email address');
//   assert(subject, 'please specify a subject');

//   const emailData = {
//     subject,
//     from: `${process.env.MAILGUN_FROM_NAME} <${process.env.MAILGUN_FROM_EMAIL}>`,
//     to: email,
//     text,
//   };

//   if (html) {
//     emailData.html = html;
//   }

//   return mg
//     .messages()
//     .send(emailData)
//     .then((body) => {
//       log.info(`Sent basic email to ${email}`);
//       return body;
//     })
//     .catch((error) => {
//       log.error(error);
//       throw error;
//     });
// }
