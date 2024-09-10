import { hashInput } from "./inputHashing.js";
import dotenv from "dotenv";

dotenv.config();

const getExpectDuration = () => {
  return Number(process.env.VERIFICATION_EXPIRES_IN.slice(0, -1));
};

export const createToken = async (email) => {
  const token = await hashInput(email);
  const currentTime = Math.round(Date.now() / 1000);
  const expired_at = currentTime + getExpectDuration();
  const tokenObject = {
    value: token,
    expired_at: expired_at,
  };
  return tokenObject;
};

const isSameHash = (token, user) => {
  const stored_token = user.validation_token.value;
  return token === stored_token;
};

const convertToUNIXTimeStamp = (timeStr) => {
  const time = new Date(timeStr);
  return time.getTime();
};

const isValidTime = (user) => {
  const tokenExpireTime = user.validation_token.expired_at;
  const convertedExpireTime = convertToUNIXTimeStamp(tokenExpireTime);
  const currentTime = Math.round(Date.now() / 1000);

  return currentTime < convertedExpireTime;
};

export const isValidVerifyToken = async (token, user) => {
  try {
    const validTime = isValidTime(user);
    const sameToken = isSameHash(token, user);

    if (sameToken && validTime) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw new Error("Cannot verify token");
  }
};
