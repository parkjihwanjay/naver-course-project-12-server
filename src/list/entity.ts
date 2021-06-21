import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinTable, OneToMany, UpdateResult, JoinColumn } from 'typeorm';
import Board from '@/board/entity';
import Card from '@/card/entity';
import TimeStamp from '@/timeStamp/entity';

@Entity()
class List extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany((type) => Card, (card) => card.list)
  @JoinColumn()
  cards: Card[];

  @ManyToOne((type) => Board, (board) => board.lists, { onDelete: 'CASCADE' })
  @JoinColumn()
  board: Board;

  static findByBoard(boardId: number): Promise<List[]> {
    return this.createQueryBuilder('board')
      .leftJoinAndSelect('borad.lists', 'list')
      .leftJoinAndSelect('list.cards', 'card')
      .where('board.id = :boardId', { boardId })
      .getMany();
  }

  static getAllNested(listId: number): Promise<List> {
    return this.createQueryBuilder('list').where('list.id = :listId', { listId }).leftJoinAndSelect('list.cards', 'card').getOne();
  }
}

export default List;
