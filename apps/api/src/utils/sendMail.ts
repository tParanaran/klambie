import jwt from 'jsonwebtoken';
import { transporter } from '@/lib/mail';
import { BASE_WEB_URL, SECRET_KEY } from '@/config';
import Handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';

type SendMail = {
  email: string;
  name: string;
  htmlPath: string;
  subject: string;
};

export default async function SendMail(dataMail: SendMail): Promise<void> {
  const { email, name, htmlPath, subject } = dataMail;

  const templatePath = path.join(process.cwd(), '/src/templates', htmlPath);
  const templateSource = await fs.readFileSync(templatePath, 'utf-8');
  const compiledTemplate = Handlebars.compile(templateSource);

  const token = jwt.sign({ email }, SECRET_KEY as string, { expiresIn: '1hr' });

  const vertificationUrl = BASE_WEB_URL + '/verification/' + token;
  const loginUrl = BASE_WEB_URL + '/login';
  const contactUrl = BASE_WEB_URL + '/contact';

  const html = compiledTemplate({
    name,
    vertificationUrl,
    loginUrl,
    contactUrl,
  });

  await transporter.sendMail({
    from: '"Klambie Team" <support@klambie.com>',
    to: email,
    subject: subject,
    html: html,
  });
}
