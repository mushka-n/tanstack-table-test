import { DSFile } from '@/types/DSItems/DSFile';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FilesStoreState {
  selection: DSFile[];
  setSelection: (selection: DSFile[]) => void;
}

const useFilesStore = create<FilesStoreState>()(
  persist(
    (set) => ({
      selection: [],

      setSelection: (selection: DSFile[]) =>
        set((state) => ({ ...state, selection })),
    }),
    {
      name: 'files-store',
    }
  )
);

export default useFilesStore;
