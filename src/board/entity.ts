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
// import { BoardUser } from '@/boardUser';

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
  @JoinColumn()
  users: User[];

  static getAllNested(boardId: number): Promise<Board> {
    return this.createQueryBuilder('board')
      .where('board.id = :boardId', { boardId })
      .leftJoinAndSelect('board.lists', 'list')
      .leftJoinAndSelect('list.cards', 'card')
      .leftJoinAndSelect('board.labels', 'label')
      .getOne();
  }
}
export default Board;
