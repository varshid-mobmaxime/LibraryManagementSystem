import jwt from "jsonwebtoken";
export const decodeToken = (token) => {
  return jwt.decode(token.split(" ")[1]);
};
