import { DSFile } from '@/types/DSItems/DSFile';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FilesStoreState {
  selection: DSFile[];
  addItem: (addedFile: DSFile) => void;
  removeItem: (removedFile: DSFile) => void;
}

const useFilesStore = create<FilesStoreState>()(
  persist(
    (set) => ({
      selection: [],

      addItem: (addedFile: DSFile) =>
        set((state) => ({
          ...state,
          selection: [...state.selection, addedFile],
        })),

      removeItem: (removedFile: DSFile) =>
        set((state) => ({
          ...state,
          selection: state.selection.filter((f) => f.id !== removedFile.id),
        })),
    }),
    {
      name: 'files-store',
    }
  )
);

export default useFilesStore;
