import bcrypt from "bcrypt";

const SALT_SECRET = 10;
export const hashPassword = async (input) => {
  try {
    const salt = await bcrypt.genSalt(SALT_SECRET);
    const hash = await bcrypt.hash(input, salt);
    return hash;
  } catch (err) {
    throw new Error("Cannot create password");
  }
};

export const checkPassword = async (inputPassword, storedPassword) => {
  try {
    const result = await bcrypt.compare(inputPassword, storedPassword);
    if (result) {
      // Passwords match, authentication successful
      console.log("Passwords match! User authenticated.");
    } else {
      // Passwords don't match, authentication failed
      console.log("Passwords do not match! Authentication failed.");
    }
    return result;
  } catch (err) {
    throw new Error("cannot check password");
  }
};
