import { Entity, Column, JoinTable, PrimaryColumn, OneToMany } from 'typeorm';
import { Board } from '../board';
import { User } from '../user';
import { TimeStamp } from '../timeStamp';

type TStatus = 'read' | 'write' | 'update' | 'delete';

@Entity()
class BoardUser extends TimeStamp {
  @PrimaryColumn()
  @OneToMany((type) => Board, (board) => board.boardUsers)
  @JoinTable()
  boardId: number;

  @PrimaryColumn()
  @OneToMany((type) => User, (user) => user.boardUsers)
  @JoinTable()
  userEmail: string;

  @Column()
  status: TStatus;

  static findByEmailAndBoardId(userEmail: string, boardId: string): Promise<BoardUser> {
    return BoardUser.findOne({ where: { userEmail, boardId } });
  }
}
export default BoardUser;
