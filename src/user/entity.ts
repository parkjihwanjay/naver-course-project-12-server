import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import Board from '@/board/entity';
import BoardUser from '@/boardUser/entity';
import TimeStamp from '@/timeStamp/entity';

@Entity()
class User extends TimeStamp {
  @PrimaryColumn()
  email: string;

  @Column()
  id: string;

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
