import { sign } from 'jsonwebtoken';
import { transporter } from '@/lib/mail';
import { BASE_WEB_URL, SECRET_KEY } from '@/config';
import Handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';

export default async function SendMail(email: string, name: string) {
  const templatePath = path.join(__dirname, '../templates', 'registerMail.hbs');

  const templateSource = await fs.readFileSync(templatePath, 'utf-8');
  const compiledTemplate = Handlebars.compile(templateSource);

  const token = sign({ email }, SECRET_KEY as string, { expiresIn: '1hr' });

  const vertificationUrl = BASE_WEB_URL + '/verification/' + token;

  const html = compiledTemplate({ name, email, vertificationUrl });

  await transporter.sendMail({
    from: '<klambie@klambie.com>',
    to: email,
    subject: 'Verify your Klambie account',
    html: html,
  });
}
