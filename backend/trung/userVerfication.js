import User from "../models/userModel.js";

export const verifyUser = async (email) => {
  // const user = await User.findOne({ email });
  // console.log("Email", email);
  // const user = await User.findOne({ email });
  // console.log("Before");
  // console.log(user);
  const updatedUser = await User.findOneAndUpdate(
    { email },
    { $set: { isVerified: true } },
    { returnDocument: "after" }
  );
  // console.log("After");
  // console.log(updatedUser);
  // const updatedUser = Object.assign(user, {
  //   isVerified: true,
  //   // updated_at: Date.now(),
  // });
  return updatedUser;
};

// const decode = {
//   status: "success",
//   data: {
//     message: "Email verified successfully",
//     decoded: {
//       email: "viettrung.doan@metropolia.fi",
//       iat: 1725663463,
//       exp: 1725663583,
//     },
//   },
// };
