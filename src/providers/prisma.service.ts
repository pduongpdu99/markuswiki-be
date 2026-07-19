
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        const adapter = new PrismaMariaDb({
            host: process.env.DATABASE_URL,
            port: 3306,
            user: process.env.DATABASE_URL,
            password: process.env.DATABASE_URL,
            connectionLimit: 5
        });
        super({ adapter });
    }
}
