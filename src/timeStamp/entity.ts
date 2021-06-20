import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

abstract class TimeStamp extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  udpatedAt: Date;
}
export default TimeStamp;
