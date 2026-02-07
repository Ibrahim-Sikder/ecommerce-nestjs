/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product-.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  // Create product
  async create(
    createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    const existingSku = await this.prisma.product.findUnique({
      where: { sku: createProductDto.sku },
    });
    if (existingSku) {
      throw new ConflictException(
        `Product with SKU ${createProductDto.sku} already exist`,
      );
    }

    const product = await this.prisma.product.create({
      data: {
        ...createProductDto,
        price: new Prisma.Decimal(createProductDto.price),
      },
      include: {
        category: true,
      },
    });

    return this.formatProduct(product);
  }
}
