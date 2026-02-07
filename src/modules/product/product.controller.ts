/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product-.dto';
import { ProductResponseDto } from './dto/product-response.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create a new product ' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: ProductResponseDto,
  })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Sku already exist',
  })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully ',
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden admin role required',
  })
  async create(
    @Body() CreateProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    return await this.productService.create(CreateProductDto);
  }
}
