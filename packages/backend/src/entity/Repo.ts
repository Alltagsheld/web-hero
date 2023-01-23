import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Task } from "./Task";

@Entity()
export class Repo {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  fileName: string;

  @Column("text")
  content: string;

  @ManyToOne(() => Task, (task) => task.testFiles)
  task: Task;
}
