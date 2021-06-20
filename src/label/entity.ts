import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Card } from '../card';
import { Board } from '../board';
import { TimeStamp } from '../timeStamp';

@Entity()
class Label extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany((type) => Card, (card) => card.labels)
  @JoinTable()
  cards: Card[];

  @ManyToOne((type) => Board, (board) => board.labels)
  @JoinTable()
  board: Board;
}
export default Label;
