import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ProductModule } from './product/product.module';
import { PlansModule } from './plans/plans.module';

@Module({
  imports: [AuthModule, ProductModule, PlansModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
