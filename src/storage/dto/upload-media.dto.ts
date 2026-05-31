import { IsNotEmpty, IsString } from 'class-validator';

export class UploadMediaDto {
  @IsString()
  @IsNotEmpty()
  projectName!: string;
}
