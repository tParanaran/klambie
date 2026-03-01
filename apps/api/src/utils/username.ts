import { customAlphabet } from 'nanoid';

export default async function GenerateUsername(): Promise<string> {
  const alphabet =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  const nanoid = customAlphabet(alphabet, 10);

  const username = nanoid();

  return username;
}
