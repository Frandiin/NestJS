import {
  Get,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthMiddleware } from 'src/auth/auth.middleware';

import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';

@UseGuards(AuthMiddleware)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo de imagem enviado.');
    }

    const imageUrl = `/uploads/${file.filename}`;
    const product = await this.productService.create(createProductDto, file);
    return {
      message: 'Produto criado com sucesso!',
      product,
      file: {
        filename: file.filename,
        originalname: file.originalname,
        size: file.size,
      },
    };
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(+id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productService.update(+id, updateProductDto);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const product = await this.productService.remove(+id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
  }
}
