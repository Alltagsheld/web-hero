import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  UpdateDateColumn,
} from "typeorm";
import { Label } from "./Label";
import { Quest } from "./Quest";
import { Repo } from "./Repo";
import { Test } from "./Test";
import { User } from "./User";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  status: string;

  @Column("text")
  description: string;

  @Column("text")
  shortDescription: string;

  @Column()
  estimation: string;

  @Column()
  gainedEP: number;

  @ManyToOne(() => Quest, (quest) => quest.tasks)
  quest: Quest;

  @ManyToMany(() => Label)
  @JoinTable()
  labels: Label[];

  @OneToMany(() => Test, (test) => test.task)
  testFiles: Test[];

  @OneToMany(() => Repo, (repo) => repo.task)
  repoFiles: Repo[];

  @Column({ nullable: true }) // new to check when a task was solved
  finishedAt: Date;
}
