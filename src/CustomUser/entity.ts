import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import Board from '@/board/entity';
import TimeStamp from '@/timeStamp/entity';
import { BoardUser } from '@/boardUser';

@Entity()
class CustomUser extends TimeStamp {
  @PrimaryColumn()
  email: string;

  @Column()
  id: string;

  @OneToMany((type) => BoardUser, (boardUser) => boardUser.user)
  boardUsers: BoardUser[];

  @ManyToMany((type) => Board)
  @JoinTable()
  boards: Board[];

  static async findByEmail(email: string): Promise<CustomUser> {
    return CustomUser.findOne({
      email,
    });
  }
}

export default CustomUser;
