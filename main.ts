import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

import userRoute from "./routes/userRoute";
import expenseRoute from "./routes/expenseRoute";

const app = new Elysia().use(cors());

app.use(userRoute);
app.use(expenseRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("🚀 ~ app.listen ~ 3000:", 3000);
});
