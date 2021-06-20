import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class TimeStamp extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  udpatedAt: Date;
}
