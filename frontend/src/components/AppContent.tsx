import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Board, Task, TaskStatus, Column } from '../types';
import { Sidebar } from './Sidebar';
import { MainLayout } from './MainLayout';
import { AragonBoard } from './AragonBoard';

interface AppContentProps {
  boards: Board[];
  tasks: Task[];
  selectedBoard: Board | null;
  tasksLoading: boolean;
  tasksError: string | null;
  defaultColumns: Column[];
  onBoardSelect: (board: Board) => void;
  onCreateBoard: () => void;
  onBackToHome: () => void;
  onCreateTask: () => void;
  onTaskStatusChange: (taskId: string, status: TaskStatus) => void;
  onTaskEdit: (task: Task) => void;
  onTaskDelete: (taskId: string) => void;
  onAddColumn: () => void;
  onEditBoard: (board: Board) => void;
  onDeleteBoard: (boardId: string) => void;
}

export const AppContent: React.FC<AppContentProps> = ({
  boards,
  tasks,
  selectedBoard,
  tasksLoading,
  tasksError,
  defaultColumns,
  onBoardSelect,
  onCreateBoard,
  onBackToHome,
  onCreateTask,
  onTaskStatusChange,
  onTaskEdit,
  onTaskDelete,
  onAddColumn,
  onEditBoard,
  onDeleteBoard,
}) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar
        boards={boards}
        selectedBoard={selectedBoard}
        onBoardSelect={onBoardSelect}
        onCreateBoard={onCreateBoard}
        onBackToHome={onBackToHome}
        onEditBoard={onEditBoard}
        onDeleteBoard={onDeleteBoard}
      />

      {/* Main Content */}
      <MainLayout selectedBoard={selectedBoard} onCreateTask={onCreateTask}>
        {!selectedBoard ? (
          // Home View
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h4" gutterBottom>
                Welcome to Aragon Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Select a board from the sidebar to get started, or create a new one.
              </Typography>
              {boards.length === 0 && (
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<AddIcon />}
                  onClick={onCreateBoard}
                >
                  Create Your First Board
                </Button>
              )}
            </Box>
          </Container>
        ) : (
          // Aragon Dashboard Board View
          <>
            {tasksError && (
              <Alert severity="error" sx={{ m: 2 }}>
                {tasksError}
              </Alert>
            )}

            {tasksLoading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Box textAlign="center">
                  <CircularProgress />
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    Loading tasks...
                  </Typography>
                </Box>
              </Box>
            ) : (
              <AragonBoard
                tasks={tasks}
                columns={selectedBoard.columns || defaultColumns}
                onTaskStatusChange={onTaskStatusChange}
                onTaskEdit={onTaskEdit}
                onTaskDelete={onTaskDelete}
                onCreateTask={onCreateTask}
                onAddColumn={onAddColumn}
              />
            )}
          </>
        )}
      </MainLayout>
    </Box>
  );
};
