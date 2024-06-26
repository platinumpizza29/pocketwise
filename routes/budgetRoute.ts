import Elysia from "elysia";
import { Budget, PrismaClient } from "@prisma/client";

const budgetRoute = new Elysia();

//CRUD Operations
//get budget per users
budgetRoute.get(
  "/budget/:userId",
  async ({ params }: { params: { userId: string } }) => {
    const { userId } = params;
    const prisma = new PrismaClient();
    const budget = await prisma.budget.findMany({
      where: {
        userId: parseInt(userId),
      },
    });
    return {
      status: 200,
      body: budget,
    };
  }
);

//create budget
budgetRoute.post(
  "/budget",
  async ({ params, body }: { params: { userId: string }; body: Budget }) => {
    const { userId } = params;
    const { startDate, endDate, amount } = body;
    const prisma = new PrismaClient();
    const budget = await prisma.budget.create({
      data: {
        userId: parseInt(userId),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        amount: amount,
      },
    });
    return {
      status: 200,
      body: budget,
    };
  }
);

//update budget
budgetRoute.put(
  "/budget/:id",
  async ({ params, body }: { params: { id: string }; body: Budget }) => {
    const { id } = params;
    const { startDate, endDate, amount } = body;
    const prisma = new PrismaClient();
    const budget = await prisma.budget.update({
      where: {
        id: parseInt(id),
      },
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        amount: amount,
      },
    });
    return {
      status: 200,
      body: budget,
    };
  }
);

//delete budget
budgetRoute.delete(
  "/budget/:id",
  async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const prisma = new PrismaClient();
    const budget = await prisma.budget.delete({
      where: {
        id: parseInt(id), // Change userId to id
      },
    });
    return {
      status: 200,
      body: budget,
    };
  }
);

export default budgetRoute;
