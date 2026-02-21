import nodemailer from 'nodemailer';
import { NODEMAILER_PASS, NODEMAILER_EMAIL } from '@/config';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASS,
  },
});
