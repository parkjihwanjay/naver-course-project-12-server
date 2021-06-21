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
import User from '@/CustomUser/entity';
// import BoardUser from '@/boardUser/entity';
import List from '@/list/entity';
import Label from '@/label/entity';
import TimeStamp from '@/timeStamp/entity';
import { BoardUser } from '@/boardUser';

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

  // @ManyToMany((type) => User, (user) => user.boards)
  // users: User[];

  @OneToMany((type) => BoardUser, (boardUsers) => boardUsers.board)
  boardUsers: BoardUser[];
}
export default Board;
