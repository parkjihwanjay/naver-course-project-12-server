import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user';
import { BoardUser } from '../boardUser';
import { List } from '../list';
import { Label } from '../label';
import { TimeStamp } from '../timeStamp';

@Entity()
class Board extends TimeStamp {
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
export default Board;
