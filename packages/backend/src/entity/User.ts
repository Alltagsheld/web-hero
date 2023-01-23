import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Badge } from "./Badge";
import { Quest } from "./Quest";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password?: string;

  @Column({ default: 0})
  totalEp: number;

  @Column({ default: 0})
  htmlEp: number;

  @Column({ default: 0})
  cssEp: number;

  @Column({ default: 0})
  typescriptEp: number;

  @Column({ default: 0})
  testEp: number;

  @Column({ default: 0})
  gitEp: number;

  @OneToMany(() => Quest, (quest) => quest.user)
  @JoinTable()
  quests: Quest[];

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  passwordChangedAt: Date;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToMany(() => Badge)
  @JoinTable()
  badges: Badge[];
}
