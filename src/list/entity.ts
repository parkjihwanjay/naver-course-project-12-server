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

  @ManyToOne((type) => Board, (board) => board.lists)
  @JoinColumn()
  board: Board;

  static findByBoard(boardId: number): Promise<List[]> {
    return this.createQueryBuilder('list').leftJoinAndSelect('list.board', 'board').where('board.id = :boardId', { boardId }).getMany();
  }
}

export default List;
