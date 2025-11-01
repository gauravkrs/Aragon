import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Add as AddIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  ViewKanban as AragonIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Board } from '../types';
import { useThemeMode } from '../contexts/ThemeContext';

interface SidebarProps {
  boards: Board[];
  selectedBoard: Board | null;
  onBoardSelect: (board: Board) => void;
  onCreateBoard: () => void;
  onBackToHome: () => void;
  onEditBoard: (board: Board) => void;
  onDeleteBoard: (boardId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  boards,
  selectedBoard,
  onBoardSelect,
  onCreateBoard,
  onBackToHome,
  onEditBoard,
  onDeleteBoard,
}) => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Box
      sx={{
        width: 280,
        height: '100vh',
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <AragonIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              cursor: 'pointer',
            }}
            onClick={onBackToHome}
          >
            Aragon Dashboard
          </Typography>
        </Box>

        {selectedBoard && (
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                mb: 1,
              }}
            >
              {selectedBoard.title}
            </Typography>
            {selectedBoard.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '0.8125rem' }}
              >
                {selectedBoard.description}
              </Typography>
            )}
          </Box>
        )}
      </Box>

      {/* Boards List */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Box sx={{ px: 2, mb: 2 }}>
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontWeight: 500,
              px: 1,
            }}
          >
            ALL BOARDS ({boards.length})
          </Typography>
        </Box>

        <List sx={{ px: 2 }}>
          {boards.map((board) => {
            const BoardItem = ({ board }: { board: Board }) => {
              const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
              const open = Boolean(anchorEl);

              const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
                event.stopPropagation();
                setAnchorEl(event.currentTarget);
              };

              const handleMenuClose = () => {
                setAnchorEl(null);
              };

              const handleEdit = () => {
                handleMenuClose();
                onEditBoard(board);
              };

              const handleDelete = () => {
                handleMenuClose();
                onDeleteBoard(board.id);
              };

              return (
                <>
                  <ListItemButton
                    selected={selectedBoard?.id === board.id}
                    onClick={() => onBoardSelect(board)}
                    sx={{
                      borderRadius: 1,
                      pr: 1,
                      '&.Mui-selected': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.dark,
                        },
                        '& .MuiListItemIcon-root': {
                          color: theme.palette.primary.contrastText,
                        },
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={board.title}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={handleMenuClick}
                      sx={{
                        opacity: 0.7,
                        '&:hover': { opacity: 1 },
                        color: selectedBoard?.id === board.id 
                          ? theme.palette.primary.contrastText 
                          : theme.palette.text.secondary,
                      }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </ListItemButton>

                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
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
                </>
              );
            };

            return (
              <ListItem key={board.id} disablePadding sx={{ mb: 0.5 }}>
                <BoardItem board={board} />
              </ListItem>
            );
          })}

          <ListItem disablePadding sx={{ mt: 2 }}>
            <Button
              fullWidth
              startIcon={<AddIcon />}
              onClick={onCreateBoard}
              sx={{
                justifyContent: 'flex-start',
                color: theme.palette.primary.main,
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
                py: 1,
                px: 2,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              Create New Board
            </Button>
          </ListItem>
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
            <Typography variant="body2" color="text.secondary">
              Theme
            </Typography>
          </Box>
          <IconButton
            onClick={toggleTheme}
            size="small"
            sx={{
              backgroundColor: theme.palette.action.selected,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            {mode === 'dark' ? (
              <LightModeIcon fontSize="small" />
            ) : (
              <DarkModeIcon fontSize="small" />
            )}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
