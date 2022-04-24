import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid'
import { CreateBoardDto } from './dto/create-board.dto';
@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto): Board {
        const { title, description } = createBoardDto
        const board: Board = {
            id: uuid(),
            title: title,
            description: description,
            status: BoardStatus.PUBLIC // 이거는 인젝션 안해도 선언 안해줘도 된다. 어차피 public, private만 사용하는거니까 
        }
        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board {
        return this.boards.find((board) => board.id === id)
    }

    deleteBoard(id: string): void {
        //리턴값을 안줄것이기 때문에 void
        this.boards = this.boards.filter((board) => board.id !== id)
    }

    updateBoardStatus(id: string, status: BoardStatus) {
        const selectedBoard = this.getBoardById(id);
        selectedBoard.status = status;
        return selectedBoard;
    }



}
