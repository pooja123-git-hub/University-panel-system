import { InputType, Field, Int } from '@nestjs/graphql';
import { IsBoolean, Min } from 'class-validator';

@InputType()
export class PaginationInput {
    
    @Field(() => Int, { description: "No. of record which are skip." })
    @Min(0, { message: "skip value must be equal to zero or greater" })
    skip: number;

    @Field(() => Int, { description: "No. of record which are take(limit)." })
    @Min(1, { message: "take value must be equal to 1 or greater" })
    take: number;

    @Field({ description: "Pagination true or false", defaultValue: true })
    @IsBoolean()
    pagination: boolean;
}
