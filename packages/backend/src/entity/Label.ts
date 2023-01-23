import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Task } from "./Task";

@Entity()
export class Label {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  value: string;

  @ManyToMany(() => Task)
  @JoinTable()
  task: Task;
}
