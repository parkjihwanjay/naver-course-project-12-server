import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinTable, OneToMany, UpdateResult } from 'typeorm';
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

  static findByBoard(boardId: number): Promise<List[]> {
    return this.createQueryBuilder('list').leftJoinAndSelect('list.board', 'board').where('board.id = :boardId', { boardId }).getMany();
  }

  static async updateList(id, data: List): Promise<UpdateResult> {
    // const list = await List.findOne({ id });
    // list.id = data.id;
    // list.title = data.title;
    // list.cards = data.cards;
    // list.board = data.board;
    // await list.save();
    // return list;
    return this.createQueryBuilder('list').update(List).set(data).where('id= :id', { id }).execute();
  }
}

export default List;
