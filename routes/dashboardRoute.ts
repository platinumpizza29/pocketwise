import Elysia from "elysia";
import { PrismaClient } from "@prisma/client";

const dashRoute = new Elysia();
const prisma = new PrismaClient();

//get all income and expense calculate savings and total expense, most spent

dashRoute.get(
  "/dashboard/:id",
  async ({ params }: { params: { id: string } }) => {
    try {
      const incomes = await prisma.income.findMany({
        where: {
          userId: parseInt(params.id),
        },
        include: {
          user: true,
        },
      });

      const expenses = await prisma.expense.findMany({
        where: {
          userId: parseInt(params.id),
        },
      });

      // Calculate income based on hours and hourly pay for one month
      const totalIncome = incomes.reduce((acc, income) => {
        const daysInMonth = getDaysInMonth(income.startDate, income.endDate);
        const hoursPerDay = income.hours / daysInMonth;
        const monthlyIncome = hoursPerDay * income.hourlyPay * 30; // Assuming 30 days in a month
        return acc + monthlyIncome;
      }, 0);

      const totalExpense = expenses.reduce(
        (acc, expense) => acc + expense.amount,
        0
      );
      const savings = totalIncome - totalExpense;

      return {
        totalIncome,
        totalExpense,
        savings,
      };
    } catch (err) {
      console.error(err);
      return { error: "Internal server error" };
    }
  }
);

function getDaysInMonth(startDate: Date, endDate: Date): number {
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  const diffDays = Math.round(
    Math.abs((endDate.getTime() - startDate.getTime()) / oneDay)
  );
  return diffDays + 1; // Add 1 to include both start and end dates
}
export default dashRoute;
