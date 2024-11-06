import { NextFunction, Request, Response } from "express";
import { stat } from "fs";
import jwt from "jsonwebtoken";

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).send({
      status: "error",
      message: "Unauthorized",
    });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    res.status(500).send({
      error: "Internal Server Error, JWT LOM DISET COKK",
    });

    return;
  }

  jwt.verify(token, jwtSecret, (err: any, user: any) => {
    if (err) {
      res.status(403).send({
        status: "error",
        message: "Forbidden",
      });

      return;
    }

    req.user = user;
    next();
  });
};

export default authenticateJWT;
