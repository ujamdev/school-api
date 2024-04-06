import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class DatabaseModule { }

function getTypeOrmModuleOptions(configService: ConfigService): TypeOrmModuleOptions {
  const databaseOptions = configService.get('database');

  return {
    type: databaseOptions.type,
    host: databaseOptions.host,
    port: databaseOptions.port,
    username: databaseOptions.username,
    password: databaseOptions.password,
    database: databaseOptions.database,
    entities: ['dist/**/*.entity.js'],
    synchronize: databaseOptions.synchronize,
  };
}
