import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // Prefix all routes with /api
  app.setGlobalPrefix('api');

  // Validate and strip unknown fields on every incoming DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Allow the admin and affiliate frontends to call the API.
  // In dev, any localhost port is allowed (Vite may pick a different port);
  // in production, restrict to the explicit CORS_ORIGINS list.
  // Origins are normalized (trailing slash + case) so minor config typos don't block.
  const logger = new Logger('Bootstrap');
  const normalizeOrigin = (o: string): string => o.trim().replace(/\/+$/, '').toLowerCase();
  const corsOrigins = (config.get<string>('CORS_ORIGINS') ?? '')
    .split(',')
    .map(normalizeOrigin)
    .filter(Boolean);
  const isLocalhost = (origin: string): boolean =>
    /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
  logger.log(`CORS allowed origins: ${corsOrigins.length > 0 ? corsOrigins.join(', ') : '(none configured)'}`);
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || corsOrigins.includes(normalizeOrigin(origin)) || isLocalhost(origin)) {
        callback(null, true);
      } else {
        logger.warn(`CORS blocked origin: ${origin}`);
        callback(null, false);
      }
    },
    credentials: true,
  });

  // Interactive API docs at /docs
  const swaggerConfig = new DocumentBuilder()
    .setTitle('AMS API')
    .setDescription('Affiliate Management System API')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const port = config.get<number>('PORT') ?? 3000;
  await app.listen(port);

  logger.log(`API running at http://localhost:${port}/api`);
  logger.log(`Swagger docs at http://localhost:${port}/docs`);
}

void bootstrap();
