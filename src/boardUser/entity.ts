import { Entity, Column, JoinTable, PrimaryColumn, OneToMany, JoinColumn } from 'typeorm';
import Board from '@/board/entity';
import User from '@/user/entity';
import TimeStamp from '@/timeStamp/entity';

type TStatus = 'read' | 'write' | 'update' | 'delete';

@Entity()
class BoardUser extends TimeStamp {
  @PrimaryColumn()
  @OneToMany((type) => Board, (board) => board.boardUsers)
  @JoinColumn()
  boardId: number;

  @PrimaryColumn()
  @OneToMany((type) => User, (user) => user.boardUsers)
  @JoinColumn()
  userEmail: string;

  @Column()
  status: TStatus;

  static findByEmailAndBoardId(userEmail: string, boardId: string): Promise<BoardUser> {
    return BoardUser.findOne({ where: { userEmail, boardId } });
  }
}
export default BoardUser;
