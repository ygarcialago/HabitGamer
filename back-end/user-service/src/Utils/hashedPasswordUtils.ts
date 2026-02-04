import bcrypt from "bcrypt";

const saltRounds = 10;

async function hashPassword(password: string): Promise<string> {
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
}

async function checkPassword(password: string, hashed: string): Promise<boolean> {
  return await bcrypt.compare(password, hashed);
}
