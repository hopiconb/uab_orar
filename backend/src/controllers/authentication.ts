import express from "express";
import jwt from "jsonwebtoken";
import { getUserByEmail, createUser } from "../db/users";
import { hashPassword, comparePassword } from "../helpers";


export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Missing fields");
    }

    const user = await getUserByEmail(email);
    console.log("getUserByEmail Login: ", user);
    console.log("getUserByEmail Password: ", user?.authentication);

    if (!user.email) {
      return res.status(404).send("Email not found");
    }

    const isPasswordValid = comparePassword(password, user.authentication.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    }

    console.log("JWT_SECRET: ", process.env.JWT_SECRET_KEY);

    const sessionToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

    user.authentication.sessionToken = sessionToken;
    await user.save();

    res.cookie("sessionToken", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.json({ success: true, token: sessionToken });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).send("Missing fields");
    }

    // const existingEmail = await getUserByEmail(email);
    //
    // if (existingEmail) {
    //   return res.status(400).send("Email already exists");
    // }
    // const existingUser = await getUserByUsername(username);
    //
    // if (existingUser) {
    //   return res.status(400).send("User already exists");
    // }


    const hashedPassword = hashPassword(password);

    const user = await createUser({
      email,
      username,
      authentication: {
        password: hashedPassword,
      },
    });

    console.log('USER: ', user);
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};
