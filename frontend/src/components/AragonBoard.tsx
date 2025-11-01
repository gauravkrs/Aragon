import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Circle as CircleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { Task, TaskStatus, Priority, Column } from '../types';

interface AragonBoardProps {
  tasks: Task[];
  columns: Column[];
  onTaskStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onTaskEdit: (task: Task) => void;
  onTaskDelete: (taskId: string) => void;
  onCreateTask: () => void;
  onAddColumn: () => void;
}

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

export const AragonBoard: React.FC<AragonBoardProps> = ({
  tasks,
  columns = defaultColumns,
  onTaskStatusChange,
  onTaskEdit,
  onTaskDelete,
  onCreateTask,
  onAddColumn,
}) => {
  const theme = useTheme();

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case Priority.HIGH:
        return '#ef4444';
      case Priority.MEDIUM:
        return '#f59e0b';
      case Priority.LOW:
        return '#10b981';
      default:
        return '#64748b';
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find the new status based on the destination droppableId
    const newColumn = columns.find(col => col.id === destination.droppableId);
    if (newColumn) {
      onTaskStatusChange(draggableId, newColumn.status);
    }
  };

  const TaskCard: React.FC<{ task: Task; index: number }> = ({ task, index }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleEdit = (event: React.MouseEvent) => {
      event.stopPropagation();
      handleMenuClose();
      onTaskEdit(task);
    };

    const handleDelete = (event: React.MouseEvent) => {
      event.stopPropagation();
      handleMenuClose();
      onTaskDelete(task.id);
    };

    return (
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{
              mb: 2,
              cursor: 'pointer',
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              '&:hover': {
                borderColor: theme.palette.primary.main,
              },
              ...(snapshot.isDragging && {
                transform: 'rotate(5deg)',
                boxShadow: theme.shadows[8],
              }),
            }}
            onClick={() => onTaskEdit(task)}
          >
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                    flex: 1,
                  }}
                >
                  {task.title}
                </Typography>
                <IconButton
                  size="small"
                  onClick={handleMenuClick}
                  sx={{
                    ml: 1,
                    opacity: 0.7,
                    '&:hover': { opacity: 1 },
                  }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Box>
              
              {task.description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, fontSize: '0.8125rem' }}
                >
                  {task.description}
                </Typography>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  size="small"
                  label={task.priority}
                  sx={{
                    backgroundColor: getPriorityColor(task.priority),
                    color: 'white',
                    fontSize: '0.6875rem',
                    height: 20,
                    '& .MuiChip-label': {
                      px: 1,
                    },
                  }}
                />
              </Box>
            </CardContent>

            {/* Task Menu */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              onClick={(e) => e.stopPropagation()}
              PaperProps={{
                elevation: 3,
                sx: {
                  mt: 1,
                  minWidth: 120,
                },
              }}
            >
              <MenuItem onClick={handleEdit}>
                <EditIcon fontSize="small" sx={{ mr: 1 }} />
                Edit
              </MenuItem>
              <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                Delete
              </MenuItem>
            </Menu>
          </Card>
        )}
      </Draggable>
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ display: 'flex', gap: 3, height: '100%', overflow: 'auto', p: 3 }}>
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.status);
          
          return (
            <Box key={column.id} sx={{ minWidth: 300, flex: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                  gap: 1,
                }}
              >
                <CircleIcon
                  sx={{
                    fontSize: 12,
                    color: column.color,
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: theme.palette.text.secondary,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {column.title} ({columnTasks.length})
                </Typography>
              </Box>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      minHeight: 200,
                      backgroundColor: snapshot.isDraggingOver
                        ? theme.palette.action.hover
                        : 'transparent',
                      borderRadius: 1,
                      p: 1,
                      transition: 'background-color 0.2s ease',
                    }}
                  >
                    {columnTasks.map((task, index) => (
                      <TaskCard key={task.id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Box>
          );
        })}
      </Box>
    </DragDropContext>
  );
};
