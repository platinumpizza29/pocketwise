interface UserLogin {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export { UserLogin, User };
