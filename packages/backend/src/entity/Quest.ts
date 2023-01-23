import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Task } from "./Task";
import { User } from "./User";

@Entity()
export class Quest {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Task, (task) => task.quest)
  tasks: Task[];

  @ManyToOne(() => User, (user) => user.quests)
  user: User;

  @Column({ nullable: true }) // new to check when a quest was solved
  finishedAt: Date;
}
