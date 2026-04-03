import { config } from 'dotenv';

const envFile =
  process.env.NODE_ENV === 'development' ? '.env.development' : '.env';

config({ path: envFile });
config({ path: `${envFile}.local`, override: true });

// Load all environment variables from .env file

export const PORT = process.env.PORT || 8000;
export const { SECRET_KEY, BASE_WEB_URL, NODEMAILER_PASS, NODEMAILER_EMAIL } =
  process.env;
