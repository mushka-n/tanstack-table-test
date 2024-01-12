import { useState } from 'react';
import useFilesStore from '@/stores/useFilesStore';

type AnyItem = { id: string | number; [key: string]: unknown };

export const useSelection = () => {
  const [selection, setSelection] = useState<AnyItem[]>([]);

  const filesSelection = useFilesStore((state) => state.selection);

  const selectItem = (selectedItem: AnyItem) =>
    setSelection((prev) => [...prev, selectedItem]);

  const deselectItem = (removedItem: AnyItem) =>
    setSelection((prev) => prev.filter((item) => item.id !== removedItem.id));

  const clearSelection = () => setSelection([]);

  return {
    selection,
    selectItem,
    deselectItem,
    clearSelection,
  };
};
