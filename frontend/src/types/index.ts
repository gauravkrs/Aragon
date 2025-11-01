export interface Board {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
  columns?: Column[];
}

export interface Column {
  id: string;
  title: string;
  status: TaskStatus;
  color: string;
  order: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  boardId: string;
  board?: Board;
  createdAt: string;
  updatedAt: string;
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export interface CreateBoardData {
  title: string;
  description?: string;
}

export interface UpdateBoardData {
  title?: string;
  description?: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  boardId: string;
  status?: TaskStatus;
  priority?: Priority;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: Priority;
}
