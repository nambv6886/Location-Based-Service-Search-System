import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ExceptionsFilterFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.register(),
    TypeOrmModule.forRoot(typeOrmConfig as TypeOrmModuleOptions),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: LoggingInterceptor,
    },
    {
      provide: 'APP_FILTER',
      useClass: ExceptionsFilterFilter,
    },
    {
      provide: 'APP_PIPE',
      useClass: ValidationPipe,
    },
    AppService
  ],
})
export class AppModule {}
