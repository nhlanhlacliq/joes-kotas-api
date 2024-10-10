import { hash, compare } from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
}

export async function verifyPassword(
  enteredPassword: string,
  storedHash: string
): Promise<boolean> {
  const match = await compare(enteredPassword, storedHash);
  return match;
}
