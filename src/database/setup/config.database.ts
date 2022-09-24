import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const configDatabase: TypeOrmModuleAsyncOptions = {
  useFactory: async () => {
    return {
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(<string>process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['/src/**/*.entity.ts'],
      autoLoadEntities: true,
      synchronize: true,
    };
  },
};
