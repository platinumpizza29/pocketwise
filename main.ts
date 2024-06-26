import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

const app = new Elysia().use(cors());

app.listen(3000, () => {
  console.log("🚀 ~ app.listen ~ 3000:", 3000);
});
