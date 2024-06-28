import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { UserLogin, User } from "../types/user";

const userRoute = new Elysia();
const prisma = new PrismaClient();

//* login a user and send a user token
userRoute.post("/login", async ({ body }: { body: UserLogin }) => {
  const { email, password } = body;
  try {
    //checkn if the user exist or not
    const user = await prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });
    if (!user) {
      return {
        status: 404,
        message: "Invalid email or password",
      };
    }
    //if the user exist, send a user token
    const secret = process.env.JWT_SECRET || "secret";
    const token = jwt.sign({ user }, secret, { expiresIn: "1h" });
    return {
      status: 200,
      message: "User logged in",
      token: token,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal server error",
    };
  }
});

//register user and send a token
userRoute.post("/register", async ({ body }: { body: User }) => {
  const { name, email, password } = body;
  try {
    //check if the user exist or not
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      return {
        status: 409,
        message: "User already exist",
      };
    }
    //if the user does not exist, create a new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    //send a user token
    const secret = process.env.JWT_SECRET || "secret";
    const token = jwt.sign({ newUser }, secret, { expiresIn: "1h" });
    return {
      status: 201,
      message: "User created",
      token: token,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
});

export default userRoute;
