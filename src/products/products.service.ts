import { Injectable } from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dtos/create-product.dto';
import { updateProductDto } from './dtos/update-product.dto';
import { SortPrice } from './enums/sort-price';

@Injectable()
export class ProductsService {

    constructor(
        @InjectModel(Product.name) private ProductsModel: Model<Product>,
    ) {}

    async getAllProducts(searchCategory?: string, sortPrice?: SortPrice){
        let search = {}
        let sort = {}
        if(searchCategory) {
            search['category'] = {
                $regex: searchCategory,
                $options: 'i'
            }
        }
        if(Object.values(SortPrice).includes(sortPrice)) {
            sort['price'] = sortPrice
        }
        return this.ProductsModel.find({...search}).sort({...sort});
    }

    async getProductById(id: string){
        return this.ProductsModel.findById(id);
    }

    async createProduct(createProductDto: CreateProductDto){
        return this.ProductsModel.create(createProductDto);
    }

    async updateProductById(id: string, updateProductDto: updateProductDto){
        return this.ProductsModel.findByIdAndUpdate(id, updateProductDto, {returnOriginal: false});
    }

    async removeProductById(id: string){
        return this.ProductsModel.findByIdAndDelete(id);
    }
}
