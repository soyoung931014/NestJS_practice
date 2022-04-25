import { BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

export class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOptions = [
        BoardStatus.PUBLIC,
        BoardStatus.PRIVATE
    ]
    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1;
    }
    transform(value: any) {
        /*  console.log('value', value); 
         console.log('metadata', metadata); */
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} ins't in the status`)
        }
        return value;
    }



}
