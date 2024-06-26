import { User } from "./user";
interface Expense {
  id: number;
  userId: number;
  amount: number;
  description: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

export default Expense;
