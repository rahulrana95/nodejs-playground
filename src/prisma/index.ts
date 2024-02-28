// prisma.ts
import { PrismaClient } from '@prisma/client';


const testConfig = {
  datasources: {
    db: {
      url: 'file:mydatabase.db',
    },
  },
}

const prisma = process.env.TEST_ENV === 'TEST' ? new PrismaClient(testConfig) : new PrismaClient();

const ensureDbConnectedMiddleware = async (req, res, next) => {
    try {
      // Ensure Prisma client is connected to the database
      await prisma.$connect();
    //   req.db = prisma; // Attach Prisma client to the request object
      next();
    } catch (error) {
      console.error('Error connecting to the database:', error);
      next(error); // Pass error to the error handling middleware
    }
  };


  export {
    ensureDbConnectedMiddleware
  }
export default prisma;