import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

import userRoute from "./routes/userRoute";
import expenseRoute from "./routes/expenseRoute";
import incomeRoute from "./routes/incomeRoute";
import budgetRoute from "./routes/budgetRoute";

const app = new Elysia().use(cors());

app.use(userRoute);
app.use(expenseRoute);
app.use(incomeRoute);
app.use(budgetRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("🚀 ~ app.listen ~ 3000:", 3000);
});
