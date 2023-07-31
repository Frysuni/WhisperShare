import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService, ConfigType } from "@nestjs/config";
import { AppConfig } from "./app.config";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { resolve } from "node:path";
import appRegistrations from "~/app.registrations";
import { AppLogger } from "./app.logger";

void async function() {
  if (resolve(process.cwd()) !== resolve(__dirname, '../')) return process.stderr.write('Working directory of Node.JS process is not matches to the directory of this project');

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bufferLogs: true,
    },
  );

  const logger = app.get(AppLogger);
  app.useLogger(logger);
  app.flushLogs();

  const configService: ConfigService<ConfigType<typeof AppConfig>, true> = app.get(ConfigService);
  const config = configService.get('app', { infer: true });

  await appRegistrations(app.register, config.address);

  if (config.assetsAutoRouting) {
    app.useStaticAssets({
      root: resolve(process.cwd(), 'assets'),
      prefix: '/assets',
    });
  }

  app.setGlobalPrefix(config.address.pathname);

  await app.listen(config.port);

  app.enableShutdownHooks();
}();
