import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Board } from '@/entity/Board';
import { BoardUser } from '@/entity/BoardUser';
import { TimeStamp } from '@/entity/TimeStamp';

@Entity()
export class User extends TimeStamp {
  @PrimaryColumn()
  email: string;

  @Column()
  name: string;

  @ManyToOne((type) => BoardUser, (boardUser) => boardUser.userEmail)
  @JoinTable()
  boardUsers: BoardUser[];

  @ManyToMany((type) => Board, (board) => board.users)
  @JoinTable()
  boards: Board[];

  static async findByEmail(email: string): Promise<User> {
    return User.findOne({
      email,
    });
  }
}

export default User;
