import { Request, Response } from "express";
import { UserStore } from "../models/User";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JwtUserPayload } from "../middlewares/authenticateToken";

const store = new UserStore();

export const login = async (req: Request, res: Response): Promise<void> => {
  if (
    !process.env.JWT_SECRET ||
    !process.env.ACCESS_TOKEN_EXPIRY ||
    !process.env.REFRESH_TOKEN_EXPIRY
  ) {
    throw new Error("Missing environment variables");
  }

  const { firstname, lastname, password } = req.body;

  try {
    const authenticatedUser = await store.authenticate(
      firstname,
      lastname,
      password
    );

    if (authenticatedUser) {
      const jwtPayload = {
        id: authenticatedUser.id,
        firstname: authenticatedUser.firstname,
        lastname: authenticatedUser.lastname
      } as JwtPayload;
      
      const accessToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      });
      const refreshToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      });

      // Set JWT as an HTTP-Only cookie
      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
      });
      res.status(200).json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Cannot Login" });
  }
};

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (
    !process.env.JWT_SECRET ||
    !process.env.ACCESS_TOKEN_EXPIRY ||
    !process.env.REFRESH_TOKEN_EXPIRY
  ) {
    throw new Error("Missing environment variables");
  }

  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.status(401).json({ error: "Refresh token not provided" });
    return;
  }

  try {
    const decodedUser: JwtUserPayload = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET
    ) as JwtUserPayload;

    const newAccessToken = jwt.sign(decodedUser, process.env.JWT_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });

    res.cookie("token", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    });
    res.status(200).json({ message: "Token refreshed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Denied" });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  res.status(200).json({ success: true, message: "Logout successful" });
};
