import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
} from '@mui/icons-material';
import { Board } from '../types';

interface MainLayoutProps {
  selectedBoard: Board | null;
  onCreateTask: () => void;
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  selectedBoard,
  onCreateTask,
  children,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Top Bar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
            }}
          >
            {selectedBoard?.title || 'Select a Board'}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {selectedBoard && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onCreateTask}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  textTransform: 'none',
                  fontWeight: 500,
                  borderRadius: 2,
                  px: 3,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
               Add New Task
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: theme.palette.background.default,
          overflow: 'hidden',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
