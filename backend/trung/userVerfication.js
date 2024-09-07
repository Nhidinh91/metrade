import User from "../models/userModel.js";

export const verifyUser = async (email) => {

  // do I need to check for user? probably no, because there is already checking outside
  const updatedUser = await User.findOneAndUpdate(
    { email },
    { $set: { isVerified: true } },
    { returnDocument: "after" }
  );

  return updatedUser;
};
