import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "error", "warn"] });

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("DB connected via Prisma");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export { prisma, connectDB };

// ___________________________________________________________________________________
// import "dotenv/config";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "@prisma/client";

// const connectionString = process.env.DATABASE_URL;
// if (!connectionString) {
//   console.error("No Connection string is provided");
//   process.exit(1);
// }

// const adapter = new PrismaPg({ connectionString });
// const prisma = new PrismaClient({ adapter, log: ["query", "error", "warn"] });

// const connectDB = async () => {
//   try {
//     await prisma.$connect();
//     console.log("DB connected via Prisma");
//   } catch (error) {
//     console.error("Database connection error:", error);
//     process.exit(1);
//   }
// };

// const disconnectDB = async () => {
//   await prisma.$disconnect();
// };

// export { prisma, connectDB, disconnectDB };
