import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ROLE } from '../../../constants/user.constant';

export class AdminCreateUserInputDto {
  @ApiProperty({
    description: 'User 名稱',
    example: 'example',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User Role',
    example: `${ROLE['STAFF']}`,
  })
  @IsNotEmpty()
  @IsEnum(ROLE)
  role: ROLE;

  @ApiProperty({
    description: 'User CoverImage',
    example: `507f191e810c19729de860ea`,
  })
  @IsNotEmpty()
  coverImageId: string;

  @ApiProperty({
    description: 'User permissions',
    type: [String],
    example: [`507f191e810c19729de860ea`, '507f191e810c19729de860ea'],
  })
  @IsNotEmpty()
  permissionIds: string[];
}
