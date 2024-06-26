import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import Expense from "../types/expense";

const prisma = new PrismaClient();
const expenseRoute = new Elysia();

//CRUD for expenses
// get all expense per user
expenseRoute.get("/:id", async ({ params }) => {
  const { id } = params;
  const expenses = await prisma.expense.findMany({
    where: {
      id: parseInt(id),
    },
  });
  return expenses;
});

// create a expense for that user
expenseRoute.post(
  "/:id",
  async ({ params, body }: { params: { id: string }; body: Expense }) => {
    const { id } = params;
    const { description, amount } = body;
    try {
      const expense = await prisma.expense.create({
        data: {
          description,
          amount,
          user: {
            connect: {
              id: parseInt(id),
            },
          },
        },
      });
      return {
        status: 200,
        message: "Expense created",
      };
    } catch (error) {
      console.log(error.message);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }
);
