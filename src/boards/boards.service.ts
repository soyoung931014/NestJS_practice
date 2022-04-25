import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid'
import { CreateBoardDto } from './dto/create-board.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { resolve } from 'path/posix';
@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) { }
    // 모두 조회
    async getAllBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    //조회
    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne(id)

        if (!found) {
            throw new NotFoundException(`${id}를 찾을 수 없어요`)
        }
        return found
    }

    //생성
    createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto);

        // 여기부분이 repository에 들어간다. 
        /*    const { title, description } = createBoardDto;

        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })

        await this.boardRepository.save(board);
        return board;
    } */

    }

    //삭제
    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);
        console.log('result', result)
        if (result.affected === 0) {
            throw new NotFoundException(`id:${id}를 찾을 수 없습니다.`)
        }

    }

    //수정하기
    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);
        return board;
    }
}

// export class BoardsService {
//     private boards: Board[] = [];

//     getAllBoards(): Board[] {
//         return this.boards;
//     }

//     createBoard(createBoardDto: CreateBoardDto): Board {
//         const { title, description } = createBoardDto
//         const board: Board = {
//             id: uuid(),
//             title: title,
//             description: description,
//             status: BoardStatus.PUBLIC // 이거는 인젝션 안해도 선언 안해줘도 된다. 어차피 public, private만 사용하는거니까 
//         }
//         this.boards.push(board);
//         return board;
//     }

//     getBoardById(id: string): Board {
//         const found = this.boards.find((board) => board.id === id)

//         if (!found) {
//             throw new NotFoundException('너가 선택한 아이디 없어');
//         }
//         return found;
//     }

//     deleteBoard(id: string): void {
//         //리턴값을 안줄것이기 때문에 void
//         const found = this.getBoardById(id);
//         this.boards = this.boards.filter((board) => board.id !== found.id)
//     }

//     updateBoardStatus(id: string, status: BoardStatus) {
//         const selectedBoard = this.getBoardById(id);
//         selectedBoard.status = status;
//         return selectedBoard;
//     }



// }
