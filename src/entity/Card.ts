import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { Label } from './Label';
import { List } from './List';
import { TimeStamp } from './TimeStamp';

@Entity()
export class Card extends TimeStamp {
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
