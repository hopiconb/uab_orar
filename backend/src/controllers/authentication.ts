import express from "express";

import { getUserByEmail, createUser, getUserByUsername } from "../db/users";
import { random, authentication } from "../helpers";
import { send } from "process";

export const login = async (req: express.Request, res: express.Response) => {
  const flag = true;
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Missing fields");
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.status(404).send("Email not found");
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.status(401).send("Invalid credentials");
    }

    const userToSend = {
      name: user.username,
      email: user.email,
    };

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();

    res.cookie("sessionToken", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });
    return res.json({ flag, userToSend });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username, role } = req.body;

    if (!email || !password || !username || !role) {
      return res.status(400).send("Missing fields");
    }
    if (!["professor", "admin"].includes(role)) {
      return res.status(400).send("Invalid role");
    }

    const existingEmail = await getUserByEmail(email);
    if (existingEmail) {
      return res.status(400).send("Email already exists");
    }

    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      role,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};
