import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Card } from './Card';
import { Board } from './Board';
import { TimeStamp } from './TimeStamp';

@Entity()
export class Label extends TimeStamp {
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
