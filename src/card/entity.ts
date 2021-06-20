import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
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
}
export default Card;
