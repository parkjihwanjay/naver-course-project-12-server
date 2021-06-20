import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinTable, OneToMany } from 'typeorm';
import { Board } from './Board';
import { Card } from './Card';
import { TimeStamp } from './TimeStamp';

@Entity()
export class List extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany((type) => Card, (card) => card.list)
  @JoinTable()
  cards: Card[];

  @ManyToOne((type) => Board, (board) => board.lists)
  @JoinTable()
  board: Board;
}
