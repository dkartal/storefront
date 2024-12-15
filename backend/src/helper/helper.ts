import { User } from "../models/User";
import { JwtPayload } from "jsonwebtoken";

export const generateJwtPayloadFromUser = (user: User): JwtPayload => {
  return {
    id: user.id ?? 1,
    firstname: user.firstname,
    lastname: user.lastname
  } as JwtPayload;
};
