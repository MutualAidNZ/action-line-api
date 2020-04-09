import fs from 'fs';
import path from 'path';
import util from 'util';
import nunjucks from 'nunjucks';
import moment from 'moment';

const TEMPLATES_PATH = path.join(__dirname, '../templates/email');

const env = nunjucks.configure(TEMPLATES_PATH);
env.addFilter('date', (str, format) => moment(str).format(format));
env.addFilter('currency', (str) => Number(str / 100).toFixed(2));

const readFileAsync = util.promisify(fs.readFile);
const accessFileAsync = util.promisify(fs.access);

async function optionallyLoadFile({ fileName }) {
  try {
    await accessFileAsync(fileName);
    return readFileAsync(fileName);
  } catch (e) {
    return null;
  }
}

export async function loadTemplate({ templateName }) {
  const textTemplate = await optionallyLoadFile({
    fileName: path.join(TEMPLATES_PATH, `${templateName}.text.njk`),
  });
  const htmlTemplate = await optionallyLoadFile({
    fileName: path.join(TEMPLATES_PATH, `${templateName}.html.njk`),
  });

  let compiledTextTemplate = null;
  let compiledHtmlTemplate = null;

  if (textTemplate) {
    compiledTextTemplate = env.getTemplate(`${templateName}.text.njk`, true);
  }

  if (htmlTemplate) {
    compiledHtmlTemplate = env.getTemplate(`${templateName}.html.njk`, true);
  }

  return { compiledTextTemplate, compiledHtmlTemplate };
}
