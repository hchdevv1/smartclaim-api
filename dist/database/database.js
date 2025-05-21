"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaProgest = void 0;
const generate_client_db_1 = require("../../prisma/generate-client-db");
const globalForPrisma = globalThis;
exports.prismaProgest = globalForPrisma.prisma || new generate_client_db_1.PrismaClient();
//# sourceMappingURL=database.js.map