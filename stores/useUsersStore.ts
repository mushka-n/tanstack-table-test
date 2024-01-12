import { DSUser } from '@/types/DSUsers/DSUser';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UsersStoreState {
  selection: DSUser[];
  addItem: (addedUser: DSUser) => void;
  removeItem: (removedUser: DSUser) => void;
}

const useUsersStore = create<UsersStoreState>()(
  persist(
    (set) => ({
      selection: [],

      addItem: (addedUser: DSUser) =>
        set((state) => ({
          ...state,
          selection: [...state.selection, addedUser],
        })),

      removeItem: (removedUser: DSUser) =>
        set((state) => ({
          ...state,
          selection: state.selection.filter((f) => f.id !== removedUser.id),
        })),
    }),
    {
      name: 'users-store',
    }
  )
);

export default useUsersStore;
