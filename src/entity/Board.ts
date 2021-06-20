import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { BoardUser } from './BoardUser';
import { List } from './List';
import { Label } from './Label';
import { TimeStamp } from './TimeStamp';

@Entity()
export class Board extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imgUrl: string;

  @OneToMany((type) => Label, (label) => label.board)
  @JoinTable()
  labels: Label[];

  @OneToMany((type) => List, (list) => list.board)
  @JoinTable()
  lists: List[];

  @ManyToMany((type) => User, (user) => user.boards)
  @JoinTable()
  users: User[];

  @ManyToOne((type) => BoardUser, (boardUser) => boardUser.boardId)
  @JoinTable()
  boardUsers: BoardUser[];
}
