import { Injectable } from '@nestjs/common';
import { UploadClient } from '@uploadcare/upload-client'
import { CreateFileDto } from './dtos/create-file.dto';
import { File } from './schemas/file.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class FilesService {
    constructor(
        @InjectModel(File.name) private FilesModel: Model<File>,
    ) {}

    client = new UploadClient({ publicKey: process.env.UPLOADCARE_API_KEY })

    async createFile(createFileDto: CreateFileDto){
        return this.FilesModel.create(createFileDto);
    }

    async uploadFile(file: Express.Multer.File) {
        const result = await this.uploadCareUpload(file);
        const createdFile = await this.createFile({
            uuid: result.uuid,
            url: `${process.env.UPLOADCARE_URL}/${result.uuid}/-/preview/${result.imageInfo.width}x${result.imageInfo.height}`
        })
        return createdFile;
    }

    async uploadCareUpload(file: Express.Multer.File) {
        
        return await this.client.uploadFile(file.buffer, {
            fileName: file.originalname
        });
        
    }
    
}
