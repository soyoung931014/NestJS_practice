import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard()) // 모든 핸들러가 영향을 받을 것이다.
export class BoardsController {
    constructor(private boardsService: BoardsService) { }

    @Get()
    getAllBoard(): Promise<Board[]> {
        return this.boardsService.getAllBoards()
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardsService.createBoard(createBoardDto)
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.boardsService.deleteBoard(id)
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ): Promise<Board> {
        return this.boardsService.updateBoardStatus(id, status)
    }
}



// export class BoardsController {
//     // 서베스는 dependancy Injection을 해야 사용이 가능하다. 
//     constructor(private boardsService: BoardsService) { }

//     @Get()
//     getAllBoards(): Board[] {
//         return this.boardsService.getAllBoards();
//     }

//     @Post()
//     @UsePipes(ValidationPipe)
//     createBoards(
//         @Body() createBoardDto: CreateBoardDto
//     ): Board {
//         return this.boardsService.createBoard(createBoardDto)
//     }

//     //localhost:5000?id=dlfeks&title=fldie
//     @Get('/:id')
//     getBoardById(@Param('id') id: string): Board {
//         return this.boardsService.getBoardById(id)
//     }

//     @Delete('/:id')
//     deleteBoard(@Param('id') id: string): void {
//         //리턴값이 없으므로 void 타입으로 정의해준다. 
//         this.boardsService.deleteBoard(id)
//     }

//     @Patch('/:id/status')
//     updateBoardStatus(
//         @Param('id') id: string,
//         @Body('status', BoardStatusValidationPipe) status: BoardStatus
//     ): Board {
//         return this.boardsService.updateBoardStatus(id, status)
//     }

// }
