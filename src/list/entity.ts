import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinTable, OneToMany } from 'typeorm';
import { Board } from '@/entity/Board';
import { Card } from '@/entity/Card';
import { TimeStamp } from '@/entity/TimeStamp';
import { title } from 'process';

@Entity()
class List extends TimeStamp {
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

  static findByBoard(boardId: number) {
    return this.createQueryBuilder('list').leftJoinAndSelect('list.board', 'board').where('board.id = :boardId', { boardId }).getMany();
  }

  static updateList(id, data) {
    return this.createQueryBuilder('list').update(List).set(data).where('id= :id', { id }).execute();
  }
}

export default List;