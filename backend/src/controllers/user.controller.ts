import express from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

import {
  getUsers,
  deleteUser as deleteUserFromDb,
  getUserById,
  IUserJwtPayload,
} from "../models/user.model";

export const getMyUserData = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const token = req.cookies.sessionToken;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    let decoded;

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY
      ) as IUserJwtPayload;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        console.error("Token expired");
        // adaugat redirect la pagina de logare
      } else if (err instanceof JsonWebTokenError) {
        console.error("Invalid or tampered token");
        // adaugat redirect la pagina de logare + server error
      } else {
        console.error("JWT verification error:", err);
        // invalidare la token + logout
      }
    }

    const user = await getUserById(decoded.userId);
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export const getAllUsers = async (
  _: express.Request,
  res: express.Response
) => {
  try {
    const user = await getUsers();

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserFromDb(id);

    return res.json(deletedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.status(400).send("Username is required");
    }

    const user = await getUserById(id);

    user.username = username;
    await user.save();

    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export const logoutUser = async (
  req: express.Request,
  res: express.Response
) => {
  res.clearCookie("sessionToken", {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(200).json({ message: "Logged out successfully" });
};
