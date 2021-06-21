import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
import Label from '@/label/entity';
import List from '@/list/entity';
import TimeStamp from '@/timeStamp/entity';

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

  @ManyToOne((type) => List, (list) => list.cards, { onDelete: 'CASCADE' })
  @JoinColumn()
  list: List;

  @ManyToMany((type) => Label, (label) => label.cards)
  labels: Label[];

  static findByList(listId: number): Promise<Card[]> {
    return this.createQueryBuilder('card').leftJoinAndSelect('card.list', 'list').where('list.id = :listId', { listId }).getMany();
  }
}
export default Card;
