import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne, JoinTable, UpdateResult } from 'typeorm';
import { Label } from '../label';
import { List } from '../list';
import { TimeStamp } from '../timeStamp';

@Entity()
class Card extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column('date')
  date: string;

  @ManyToOne((type) => List, (list) => list.cards)
  @JoinTable()
  list: List;

  @ManyToMany((type) => Label, (label) => label.cards)
  labels: Label[];

  static findByList(listId: number): Promise<Card[]> {
    return this.createQueryBuilder('card').leftJoinAndSelect('card.list', 'list').where('list.id = :listId', { listId }).getMany();
  }

  static updateCard(id, data): Promise<UpdateResult> {
    return this.createQueryBuilder('card').update(Card).set(data).where('id= :id', { id }).execute();
  }
}
export default Card;
