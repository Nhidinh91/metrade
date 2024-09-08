import { checkHashedInput } from "./inputHashing.js";

const isSameHash = (token, user) => {
  const hashedToken = user.validation_token.value;
  return token === hashedToken;
};

const isSameInput = async (token, user) => {
  try {
    const result = await checkHashedInput(user.email, token);
    return result;
  } catch (err) {
    throw new Error("cannot check password");
  }
};

const convertToUNIXTimeStamp = (timeStr) => {
  const time = new Date(timeStr);
  return Math.floor(time.getTime() / 1000);
};

const isValidTime = (user, expectedDuration) => {
  const tokenCreatedAtStr = user.validation_token.update_at;
  const convertedTime = convertToUNIXTimeStamp(tokenCreatedAtStr);
  const currentTime = Math.round(Date.now() / 1000);
  return currentTime - convertedTime < expectedDuration;
};

export const isValidVerifyToken = async (token, user) => {
  try {
    const expectedDuration = Number(
      process.env.VERIFICATION_EXPIRES_IN.slice(0, -1)
    );

    const sameInput = await isSameInput(token, user);
    const validTime = isValidTime(user, expectedDuration);
    const sameHash = isSameHash(token, user);

    if (sameInput && validTime && sameHash) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw new Error("Cannot verify token");
  }
};
