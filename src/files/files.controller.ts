import { Controller, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { Role } from 'src/auth/dtos/signup.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/roles/guards/roles.guard';

@Controller('files')
export class FilesController {

    constructor(private filesService: FilesService) {}

    @Post('upload')
    @Roles(Role.OWNER)
    @UseGuards(AuthGuard,RolesGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile(
        new ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: /^image/,
        })
        .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        }),
    ) file: Express.Multer.File) {
        return await this.filesService.uploadFile(file);
    }
}
