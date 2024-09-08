import bcrypt from "bcrypt";

const SALT_SECRET = 10;
export const hashInput = async (input) => {
  try {
    const salt = await bcrypt.genSalt(SALT_SECRET);
    const hash = await bcrypt.hash(input, salt);
    return hash;
  } catch (err) {
    throw new Error("Cannot create hashed input");
  }
};

export const checkHashedInput = async (input, storedInput) => {
  try {
    const result = await bcrypt.compare(input, storedInput);
    
    if (result) {
      console.log("Input match! Authenticate succeeded.");
    } else {
      console.log("Input do not match! Authentication failed.");
    }
    return result;
  } catch (err) {
    throw new Error("cannot check hashed");
  }
};
