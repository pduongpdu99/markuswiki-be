import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    private readonly logger = new Logger(PrismaService.name);

    constructor() {
        const adapter = new PrismaMariaDb({
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            connectionLimit: 5,
            logger: {
                error: (err) => console.error('Driver Error:', err),
                warning: (warn) => console.warn('Driver Warn:', warn),
            }

        });
        super({ adapter, log: ['query', 'info', 'warn', 'error'] });
    }

    async onModuleInit() {
        try {
            this.logger.log("Prisma is connecting to MariaDB...");
            await this.$connect();
            console.log("Prisma service initialization with MariaDB completed.");
        } catch (error) {
            this.logger.error("Database connection failed:", error);
        }
    }
}
