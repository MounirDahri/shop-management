import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Role } from 'src/auth/dtos/signup.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { updateProductDto } from './dtos/update-product.dto';
import { SortPrice } from './enums/sort-price';

@Controller('products')
export class ProductsController {

    constructor( private productsService: ProductsService) {}

    @Get()
    async getAllProduct(@Query('searchCategory') searchCategory?: string, @Query('sortPrice') sortPrice?: SortPrice){
        return this.productsService.getAllProducts(searchCategory, sortPrice);
    }

    @Get(':id')
    @Roles(Role.OWNER)
    @UseGuards(AuthGuard,RolesGuard)
    async getProductById(@Param('id') id: string){
        return this.productsService.getProductById(id);
    }

    @Post()
    @Roles(Role.OWNER)
    @UseGuards(AuthGuard,RolesGuard)
    async createProduct(@Body() createProductDto: CreateProductDto){
        return this.productsService.createProduct(createProductDto);
    }

    @Patch(':id')
    @Roles(Role.OWNER)
    @UseGuards(AuthGuard,RolesGuard)
    async updateProduct(@Param('id') id: string, @Body() updateProductDto: updateProductDto){
        return this.productsService.updateProductById(id, updateProductDto);
    }

    @Delete(':id')
    @Roles(Role.OWNER)
    @UseGuards(AuthGuard,RolesGuard)
    async removeProduct(@Param('id') id: string){
        return this.productsService.removeProductById(id);
    }
}
