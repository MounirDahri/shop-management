import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileScehma } from './schemas/file.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: File.name,
        schema: FileScehma
      }
    ]),
  ],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule {}
