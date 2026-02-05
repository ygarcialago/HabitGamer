import jwt, { type Secret, type SignOptions, type JwtPayload } from "jsonwebtoken";


export const SECRET: Secret = process.env.JWT_SECRET!;
const EXPIRES_IN: number = Number.parseInt(process.env.JWT_EXPIRES_IN!);


export interface UserPayload extends JwtPayload {
  id: number;
  nameApp: string;
}

export const generateToken = (payload: UserPayload): string => {
  const signOptions: SignOptions = {
    expiresIn: EXPIRES_IN
  };

  return jwt.sign(payload, SECRET, signOptions);
};

export const verifyToken = (token: string): UserPayload | null => {
  try {
    return jwt.verify(token, SECRET) as UserPayload;
  } catch (error) {
    return null;
  }
};