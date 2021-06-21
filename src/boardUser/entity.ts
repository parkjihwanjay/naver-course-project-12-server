import { Entity, Column, JoinTable, PrimaryColumn, OneToMany, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import Board from '@/board/entity';
import User from '@/CustomUser/entity';
import TimeStamp from '@/timeStamp/entity';

type TStatus = 'read' | 'write' | 'update' | 'delete';

@Entity()
class BoardUser extends TimeStamp {
  @PrimaryColumn()
  @ManyToOne((type) => Board, (board) => board.boardUsers)
  board: Board;

  @PrimaryColumn()
  @ManyToOne((type) => User, (user) => user.boardUsers)
  user: User;

  @Column()
  status: TStatus;

  static findByEmailAndBoardId(userEmail: string, boardId: string): Promise<BoardUser> {
    return BoardUser.findOne({ where: { userEmail, boardId } });
  }
}
export default BoardUser;
