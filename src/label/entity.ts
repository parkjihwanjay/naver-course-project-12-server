import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  UpdateResult,
  JoinColumn,
} from 'typeorm';
import Card from '@/card/entity';
import Board from '@/board/entity';
import TimeStamp from '@/timeStamp/entity';

@Entity()
class Label extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  color: string;

  @ManyToMany((type) => Card, (card) => card.labels)
  @JoinTable()
  cards: Card[];

  @ManyToOne((type) => Board, (board) => board.labels)
  @JoinColumn()
  board: Board;

  static findByBoard(boardId: number): Promise<Label[]> {
    return this.createQueryBuilder('label').leftJoinAndSelect('label.board', 'board').where('board.id = :boardId', { boardId }).getMany();
  }
}
export default Label;
