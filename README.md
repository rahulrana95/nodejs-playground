### DB Changes
- Everytime you make changes in prisma run this command.

npx prisma generate

- After defining the table in your Prisma schema, you need to run migrations to create the table in your database. Execute the following command:

bash
Copy code
npx prisma migrate dev