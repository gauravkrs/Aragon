import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  IconButton, 
  Box, 
  Chip,
  Fade
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Board } from '../types';

interface BoardCardProps {
  board: Board;
  onEdit: (board: Board) => void;
  onDelete: (id: string) => void;
  onSelect: (board: Board) => void;
}

export const BoardCard: React.FC<BoardCardProps> = ({ board, onEdit, onDelete, onSelect }) => {
  const [showActions, setShowActions] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this board? This will also delete all tasks.')) {
      onDelete(board.id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(board);
  };

  return (
    <Card
      sx={{ 
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-2px)'
        }
      }}
      onClick={() => onSelect(board)}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, flexGrow: 1, mr: 1 }}>
            {board.title}
          </Typography>
          <Fade in={showActions}>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton
                size="small"
                onClick={handleEdit}
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleDelete}
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { color: 'error.main' }
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Fade>
        </Box>
        
        {board.description && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {board.description}
          </Typography>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip 
            label={`${board.tasks.length} tasks`} 
            size="small" 
            variant="outlined"
          />
          <Typography variant="caption" color="text.secondary">
            {new Date(board.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
