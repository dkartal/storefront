import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: JwtUserPayload;
}

export interface JwtUserPayload {
  id: number;
  firstname: string;
  lastname: string;
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (process.env.JWT_SECRET === undefined) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Access Denied" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtUserPayload;

    if (!decoded) {
      res.status(401).json({ message: "Access Denied" });
      return;
    }

    (req as AuthenticatedRequest).user = decoded;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Access Denied" });
  }
};
