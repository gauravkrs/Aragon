import React from 'react';
import { Box, CircularProgress, Typography, Alert, Button } from '@mui/material';
import { CustomThemeProvider } from './contexts/ThemeContext';
import { AppContent } from './components/AppContent';
import { BoardModal } from './components/BoardModal';
import { TaskModal } from './components/TaskModal';
import { useAppLogic } from './hooks/useAppLogic';

function App() {
  const {
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
    setBoardModalOpen,
    setTaskModalOpen,
  } = useAppLogic();

  if (boardsLoading) {
    return (
      <CustomThemeProvider>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>Loading boards...</Typography>
        </Box>
      </CustomThemeProvider>
    );
  }

  if (boardsError) {
    return (
      <CustomThemeProvider>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column">
          <Alert severity="error" sx={{ mb: 2 }}>{boardsError}</Alert>
          <Button variant="contained" onClick={() => window.location.reload()}>Retry</Button>
        </Box>
      </CustomThemeProvider>
    );
  }

  return (
    <CustomThemeProvider>
      <AppContent
        boards={boards}
        tasks={tasks}
        selectedBoard={selectedBoard}
        tasksLoading={tasksLoading}
        tasksError={tasksError}
        defaultColumns={defaultColumns}
        onBoardSelect={handleBoardSelect}
        onCreateBoard={handleCreateBoard}
        onBackToHome={handleBackToHome}
        onCreateTask={handleCreateTask}
        onTaskStatusChange={handleTaskStatusChange}
        onTaskEdit={handleEditTask}
        onTaskDelete={deleteTask}
        onAddColumn={handleAddColumn}
        onEditBoard={handleEditBoard}
        onDeleteBoard={deleteBoard}
      />

      <BoardModal
        isOpen={boardModalOpen}
        onClose={() => setBoardModalOpen(false)}
        onSubmit={handleBoardSubmit}
        board={editingBoard}
        title={editingBoard ? 'Edit Board' : 'Create New Board'}
      />

      <TaskModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        onSubmit={handleTaskSubmit}
        task={editingTask}
        boardId={selectedBoard?.id}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      />
    </CustomThemeProvider>
  );
}

export default App;
