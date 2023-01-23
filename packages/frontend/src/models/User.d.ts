export interface User {
  id: string;
  name: string;
  email: string;
  totalEp: number;
  htmlEp: number;
  cssEp: number;
  tsEp: number;
  testEp: number;
  gitEp: number;
  quests: Quest[];
  passwordChangedAt: Date;
  createdAt: string;
  updatedAt: string;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  user: User;
  finishedAt: Date;
}

export interface Label {
  id: string;
  value: string;
}

export interface Task {
  id: string;
  title: string;
  status: string;
  description: string;
  estimation: string;
  gainedEP: number;
  quest: Quest;
  labels: string[];
  testFiles: Test[];
  repoFiles: Repo[];
  finishedAt: Date;
}

export interface Repo extends Test {}

export interface TaskResponse {
  id: string;
  title: string;
  status: string;
  description: string;
  estimation: string;
  gainedEP: number;
  quest: Quest;
  labels: Label[];
  testFiles: Test[];
  repoFiles: Repo[];
  finishedAt: Date;
}

export interface Test {
  id: string;
  fileName: string;
  content: string;
  task: Task;
}
