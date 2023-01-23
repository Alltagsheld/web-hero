import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Badge {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => User)
  @JoinTable()
  user: User;
}
