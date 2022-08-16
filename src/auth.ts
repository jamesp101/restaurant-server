import * as bycrpt from "bcrypt";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { json } from "stream/consumers";
import { brotliCompress } from "zlib";

dotenv.config();
const SALTROUNDS = 10;
const SECRET = process.env.JWT_SECRET ?? "";

/* async function hashPassword(password: string): Promise<string> {
  const salt = await bycrpt.genSalt(SALTROUNDS);
  const hash = await bycrpt.hash(password, salt);
  return hash;
} */

const hashPassword = async (password: string) =>
  await bycrpt.hash(password, SALTROUNDS);

const compareHash = async (password: string, hash: string) =>
  await bycrpt.compare(password, hash);

const signDeviceToken = (device: any) =>
  jwt.sign(
    { data: device },
    SECRET,
    { expiresIn: "12h" },
  );

const verifyDeviceToken = (token: string) => jwt.verify(token, SECRET);

const decodeToken = (token: string) => jwt.decode(token);

export {
  compareHash,
  decodeToken,
  hashPassword,
  signDeviceToken,
  verifyDeviceToken,
};
