import User from "../models/userModel.js";

export const verifyUser = (email) => {
  console.log(email);
};

const decode = {
  status: "success",
  data: {
    message: "Email verified successfully",
    decoded: {
      email: "viettrung.doan@metropolia.fi",
      iat: 1725663463,
      exp: 1725663583,
    },
  },
};
