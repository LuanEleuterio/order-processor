import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class ListOrderQueryDTO {
  @IsOptional()
  @IsNumberString()
  order_id?: number;

  @IsOptional()
  @IsString()
  start_date?: string;

  @IsOptional()
  @IsString()
  end_date?: string;
}
