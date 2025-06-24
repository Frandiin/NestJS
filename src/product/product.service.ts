import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}
  async create(data: CreateProductDto, file?: Express.Multer.File) {
    const { name, description, price, imageUrl } = data;
    const product = this.prismaService.product.create({
      data: {
        name,
        description,
        price,
        imageUrl: file?.filename,
      },
    });
    return product;
  }

  findAll() {
    return this.prismaService.product.findMany();
  }

  findOne(id: number) {
    return this.prismaService.product.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateProductDto) {
    return this.prismaService.product.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prismaService.product.delete({ where: { id } });
  }
}
