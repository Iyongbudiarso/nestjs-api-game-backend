import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { RequestMethod } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Accept",
  });
  app.setGlobalPrefix("api", {
    exclude: [{ path: "healthz", method: RequestMethod.GET }],
  });

  const configService = app.get(ConfigService);
  await app.listen(configService.get("PORT") ?? 3000);

  console.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
