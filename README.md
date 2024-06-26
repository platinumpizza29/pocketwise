# PocketWise

PocketWise is an expense tracking application designed for individuals working part-time or full-time shifts. It helps users get a better understanding of their expenses and manage their budgets effectively.

## Features

1. Enter hourly pay and estimated working hours for the week.
2. Select the working week's date.
3. View estimated earnings at the end of the month/week/2 weeks.
4. Set and manage budgets.
5. Record and track expenses.

### Future Features

1. Integration with banks to fetch expenses automatically.
2. Machine learning for auto-categorizing expenses.
3. Machine learning for suggesting monthly budgets.
4. Insights and analytics on spending patterns.

## Tech Stack

### Frontend

- React.js
- Redux
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL

### Deployment

- Docker
- Kubernetes
- AWS/GCP/Azure

## Getting Started

### Prerequisites

- Node.js
- Docker (optional, for containerization)
- PostgreSQL

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/pocketwise.git
   cd pocketwise
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up the environment variables:

   ```sh
   cp .env.example .env
   ```

   Update the `.env` file with your database URL and other necessary configurations.

4. Set up the database:

   ```sh
   npx prisma migrate dev --name init
   ```

5. Generate the Prisma client:

   ```sh
   npx prisma generate
   ```

6. Start the development server:
   ```sh
   npm run dev
   ```

### Running Tests

To run tests, use the following command:

```sh
npm run test
```
