import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ConfigService, ConfigType } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseConfig } from "./database.config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(DatabaseConfig)],
      inject: [ConfigService],
      useFactory(
        configService: ConfigService<ConfigType<typeof DatabaseConfig>, true>
      ) {
        return {
          ...configService.get('database', { infer: true }),
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}