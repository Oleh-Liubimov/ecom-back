import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  async getAllProducts() {
    try {
      const products = await this.productsService.getAllProducts();

      return {
        status: HttpStatus.OK,
        msg: 'Successfully found products',
        data: products,
      };
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await this.productsService.getProductById(id);

      return {
        status: HttpStatus.OK,
        msg: `Successfully found product with id: ${product.id}`,
        data: product,
      };
    } catch (error) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }
}
