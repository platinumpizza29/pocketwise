import Elysia from "elysia";
import { Income, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const incomeRoute = new Elysia();

//CRUD operations for income
//get the current income by user
incomeRoute.get(
  "/income/:id",
  async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    try {
      const income = await prisma.income.findMany({
        where: {
          userId: parseInt(id),
        },
      });
      return {
        status: 200,
        income: income,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: "Internal Server Error",
      };
    }
  }
);

//create a user income
incomeRoute.post(
  "/income",
  async ({ body }: { body: Income & { userId: number } }) => {
    const { hours, hourlyPay, userId, startDate, endDate } = body;
    try {
      const income = await prisma.income.create({
        data: {
          hours,
          hourlyPay,
          userId,
          startDate: startDate,
          endDate: endDate,
        },
      });
      return {
        status: 200,
        income: income,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: "Internal Server Error",
      };
    }
  }
);

//update a user income
incomeRoute.put(
  "/income/:id",
  async ({ params, body }: { params: { id: string }; body: Income }) => {
    const { id } = params;
    const { hours, hourlyPay, startDate, endDate } = body;
    try {
      const income = await prisma.income.update({
        where: {
          id: parseInt(id),
        },
        data: {
          hours,
          hourlyPay,
          startDate: startDate,
          endDate: endDate,
        },
      });
      return {
        status: 200,
        income: income,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: "Internal Server Error",
      };
    }
  }
);

//delete a user income
incomeRoute.delete(
  "/income/:id",
  async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    try {
      const income = await prisma.income.delete({
        where: {
          id: parseInt(id),
        },
      });
      return {
        status: 200,
        income: income,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: "Internal Server Error",
      };
    }
  }
);

export default incomeRoute;
