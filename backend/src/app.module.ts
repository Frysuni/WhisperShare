import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppConfig } from "./app.config";
import { DatabaseModule } from "./database/database.module";
import { AppService } from "./app.service";
import { AppLogger } from "./app.logger";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
    }),
    ConfigModule.forFeature(AppConfig),
    DatabaseModule,
  ],
  providers: [
    AppService,
    AppLogger,
  ],
})
export class AppModule {}