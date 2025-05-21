import { PrismaClient} from '../../prisma/generate-client-db';

const globalForPrisma = globalThis as unknown as { prisma : PrismaClient}

export const prismaProgest = globalForPrisma.prisma || new PrismaClient();
