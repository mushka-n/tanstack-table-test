import { DSFile } from '@/types/DSItems/DSFile';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FilesState {
  selection: DSFile[];
}

const useFilesStore = create<FilesState>()(
  persist(
    (set) => ({
      selection: [],

      addFile: (addedFile: DSFile) =>
        set((state) => ({
          ...state,
          selection: [...state.selection, addedFile],
        })),

      removeFile: (removedFile: DSFile) =>
        set((state) => ({
          ...state,
          selection: state.selection.filter((f) => f.id !== removedFile.id),
        })),
    }),
    {
      name: 'files-storage',
    }
  )
);

export default useFilesStore;
