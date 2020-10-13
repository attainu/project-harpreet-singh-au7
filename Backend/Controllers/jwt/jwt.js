import jwt from "jsonwebtoken";
import _ from "lodash";
import dotenv from "dotenv";

dotenv.config();

export const createTokens = async (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        user: _.pick(user, "email"),
      },
      `${process.env.JWT_SECRET}`,
      {
        expiresIn: "1d",
      },
      async (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    );
  });
};

// const tokens = createTokens((error, emailToken) => {
//   if (error) {
//     return error;
//   } else {
//     return emailToken;
//   }
// });
