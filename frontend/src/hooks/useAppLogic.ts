import { useState } from 'react';
import { Board, Task, TaskStatus, Column } from '../types';
import { useBoards } from './useBoards';
import { useTasks } from './useTasks';

export const useAppLogic = () => {
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingBoard, setEditingBoard] = useState<Board | undefined>();
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const { boards, loading: boardsLoading, error: boardsError, createBoard, updateBoard, deleteBoard } = useBoards();
  const { tasks, loading: tasksLoading, error: tasksError, createTask, updateTask, deleteTask } = useTasks(selectedBoard?.id);

  // Default columns for the Aragon Board
  const defaultColumns: Column[] = [
    {
      id: 'todo',
      title: 'TODO',
      status: TaskStatus.TODO,
      color: '#64748b',
      order: 0,
    },
    {
      id: 'doing',
      title: 'DOING',
      status: TaskStatus.IN_PROGRESS,
      color: '#6366f1',
      order: 1,
    },
    {
      id: 'done',
      title: 'DONE',
      status: TaskStatus.DONE,
      color: '#10b981',
      order: 2,
    },
  ];

  // Event handlers
  const handleBoardSelect = (board: Board) => setSelectedBoard(board);
  const handleBackToHome = () => setSelectedBoard(null);
  const handleCreateBoard = () => {
    setEditingBoard(undefined);
    setBoardModalOpen(true);
  };
  const handleEditBoard = (board: Board) => {
    setEditingBoard(board);
    setBoardModalOpen(true);
  };
  const handleCreateTask = () => {
    setEditingTask(undefined);
    setTaskModalOpen(true);
  };
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setTaskModalOpen(true);
  };
  const handleBoardSubmit = async (data: any) => {
    if (editingBoard) {
      await updateBoard(editingBoard.id, data);
    } else {
      await createBoard(data);
    }
  };
  const handleTaskSubmit = async (data: any) => {
    if (editingTask) {
      await updateTask(editingTask.id, data);
    } else {
      await createTask(data);
    }
  };
  const handleTaskStatusChange = async (taskId: string, status: TaskStatus) => {
    await updateTask(taskId, { status });
  };
  const handleAddColumn = () => {
    console.log('Add column functionality to be implemented');
  };

  return {
    // State
    selectedBoard,
    boardModalOpen,
    taskModalOpen,
    editingBoard,
    editingTask,
    boards,
    tasks,
    boardsLoading,
    boardsError,
    tasksLoading,
    tasksError,
    defaultColumns,
    
    // Handlers
    handleBoardSelect,
    handleBackToHome,
    handleCreateBoard,
    handleEditBoard,
    handleCreateTask,
    handleEditTask,
    handleBoardSubmit,
    handleTaskSubmit,
    handleTaskStatusChange,
    handleAddColumn,
    deleteBoard,
    deleteTask,
    
    // Modal controls
    setBoardModalOpen,
    setTaskModalOpen,
  };
};
