import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import crypto from 'crypto'

export const hashPassword = async(password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, 12)
  return hash
};

export const comparePassword = async(password: string, hash: string): Promise<boolean> => {
  const hashedPassword = await bcrypt.compare(password, hash)
  return hashedPassword;
};

export const generateToken = (data: string, secretKey: string): string => {
  const encrypted = jwt.sign(data, secretKey)
  return encrypted;
};

// export const decryptToken = (token: string, secretKey: string): string => {
//   const decrypted = AES.decrypt(token, secretKey);
//   return decrypted.toString(enc.Utf8);
// };

export const generateEmailConfirmationToken = (): string => {

  const hash = crypto.randomBytes(32).toString('hex')
  return hash;
};
