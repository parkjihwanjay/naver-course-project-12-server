import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Board } from './Board';
import { BoardUser } from './BoardUser';
import { TimeStamp } from './TimeStamp';

@Entity()
export class User extends TimeStamp {
  @PrimaryColumn()
  email: string;

  @Column()
  name: string;

  @ManyToOne((type) => BoardUser, (boardUser) => boardUser.userEmail)
  @JoinTable()
  boardUsers: BoardUser[];

  @ManyToMany((type) => Board, (board) => board.users)
  @JoinTable()
  boards: Board[];
}
