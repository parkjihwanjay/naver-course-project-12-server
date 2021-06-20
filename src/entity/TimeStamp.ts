import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class TimeStamp {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  udpatedAt: Date;
}
