import { useState, useEffect, useCallback } from 'react';
import { Board, CreateBoardData, UpdateBoardData } from '../types';
import { apiService } from '../services/api';

export const useBoards = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBoards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedBoards = await apiService.getBoards();
      setBoards(fetchedBoards);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch boards');
    } finally {
      setLoading(false);
    }
  }, []);

  const createBoard = useCallback(async (data: CreateBoardData): Promise<Board | null> => {
    try {
      setError(null);
      const newBoard = await apiService.createBoard(data);
      setBoards(prev => [newBoard, ...prev]);
      return newBoard;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create board');
      return null;
    }
  }, []);

  const updateBoard = useCallback(async (id: string, data: UpdateBoardData): Promise<Board | null> => {
    try {
      setError(null);
      const updatedBoard = await apiService.updateBoard(id, data);
      setBoards(prev => prev.map(board => board.id === id ? updatedBoard : board));
      return updatedBoard;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update board');
      return null;
    }
  }, []);

  const deleteBoard = useCallback(async (id: string): Promise<boolean> => {
    try {
      setError(null);
      await apiService.deleteBoard(id);
      setBoards(prev => prev.filter(board => board.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete board');
      return false;
    }
  }, []);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  return {
    boards,
    loading,
    error,
    fetchBoards,
    createBoard,
    updateBoard,
    deleteBoard,
  };
};
