import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Card } from '@/card';
import { Board } from '@/board';
import { TimeStamp } from '@/timeStamp';

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

  static findByBoard(boardId: number) {
    return this.createQueryBuilder('label').leftJoinAndSelect('label.board', 'board').where('board.id = :boardId', { boardId }).getMany();
  }

  static updateLabel(id, data) {
    return this.createQueryBuilder('label').update(Label).set(data).where('id= :id', { id }).execute();
  }
}
export default Label;
