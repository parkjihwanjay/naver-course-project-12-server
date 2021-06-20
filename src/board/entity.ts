import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import User from '@/user/entity';
import BoardUser from '@/boardUser/entity';
import List from '@/list/entity';
import Label from '@/label/entity';
import TimeStamp from '@/timeStamp/entity';

@Entity()
class Board extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imgUrl: string;

  @OneToMany((type) => Label, (label) => label.board)
  @JoinColumn()
  labels: Label[];

  @OneToMany((type) => List, (list) => list.board)
  @JoinColumn()
  lists: List[];

  @ManyToMany((type) => User, (user) => user.boards)
  @JoinTable()
  users: User[];

  @ManyToOne((type) => BoardUser, (boardUser) => boardUser.boardId)
  @JoinColumn()
  boardUsers: BoardUser[];
}
export default Board;
