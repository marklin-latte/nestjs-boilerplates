import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ROLE } from '../../../constants/user.constant';

export class AdminCreateUserOutputDto {
  @ApiProperty({
    description: 'User 編號',
    example: 'ab6c6581-f0bc-4b9b-83fe-f138e73a945f ',
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'User 名稱',
    example: 'mark',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User role',
    example: `${ROLE['STAFF']}`,
  })
  @IsNotEmpty()
  @IsEnum(ROLE)
  role: ROLE;

  @ApiProperty({
    description: 'user 建立時間',
    example: new Date(),
  })
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({
    description: 'user 更新時間',
    example: new Date(),
  })
  @IsNotEmpty()
  updatedAt: Date;
}
