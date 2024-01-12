import { DSUser } from '@/types/DSUsers/DSUser';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UsersStoreState {
  selection: DSUser[];
  setSelection: (selection: DSUser[]) => void;
}

const useUsersStore = create<UsersStoreState>()(
  persist(
    (set) => ({
      selection: [],

      setSelection: (selection: DSUser[]) =>
        set((state) => ({ ...state, selection })),
    }),
    {
      name: 'users-store',
    }
  )
);

export default useUsersStore;
