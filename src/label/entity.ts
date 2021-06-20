import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToMany, ManyToOne, UpdateResult } from 'typeorm';
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

  static findByBoard(boardId: number): Promise<Label[]> {
    return this.createQueryBuilder('label').leftJoinAndSelect('label.board', 'board').where('board.id = :boardId', { boardId }).getMany();
  }

  static updateLabel(id: string, data: Label): Promise<UpdateResult> {
    return this.createQueryBuilder('label').update(Label).set(data).where('id= :id', { id }).execute();
  }
}
export default Label;
