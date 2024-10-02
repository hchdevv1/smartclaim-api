import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilsModule } from './utils/utils.module';
import { TrakcareModule } from './trakcare/trakcare.module';

@Module({
  imports: [UtilsModule, TrakcareModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
