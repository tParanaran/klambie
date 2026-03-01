import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma/client';

const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } =
  process.env;

const adapter = new PrismaMariaDb({
  host: DATABASE_HOST || '',
  user: DATABASE_USER || '',
  password: DATABASE_PASSWORD || '',
  database: DATABASE_NAME || '',
  connectionLimit: 5,
});

class PrismaService {
  private static instance: PrismaClient;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaClient({
        adapter,
        log: ['query', 'info', 'warn', 'error'],
      });
    }

    return PrismaService.instance;
  }
}

export const prisma = PrismaService.getInstance();
