import { Entity, Column, JoinTable, PrimaryColumn, OneToMany } from 'typeorm';
import { Board } from './Board';
import { User } from './User';
import { TimeStamp } from './TimeStamp';

type TStatus = 'read' | 'write' | 'update' | 'delete';

@Entity()
export class BoardUser extends TimeStamp {
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
}
