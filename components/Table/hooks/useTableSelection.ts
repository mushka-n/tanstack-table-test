import useFilesStore from '@/stores/useFilesStore';
import { AnyDataType, AnyDataTypeKey } from '../types/dataType';
import useUsersStore from '@/stores/useUsersStore';

export const useTableSelection = (
  dataTypeKey: AnyDataTypeKey
): {
  selection: AnyDataType[] | null;
  addItem: (item: AnyDataType) => void | null;
  removeItem: (item: AnyDataType) => void | null;
} => {
  // File
  const filesSelection = useFilesStore((state) => state.selection);
  const addFile = useFilesStore((state) => state.addItem);
  const removeFile = useFilesStore((state) => state.removeItem);

  // User
  const userSelection = useUsersStore((state) => state.selection);
  const addUser = useUsersStore((state) => state.addItem);
  const removeUser = useUsersStore((state) => state.removeItem);

  const selection = (
    dataTypeKey === 'file'
      ? filesSelection
      : dataTypeKey === 'user'
        ? userSelection
        : null
  ) as AnyDataType[];

  const addItem = (dataTypeKey === 'file' ? addFile : addUser) as (
    item: AnyDataType
  ) => void;

  const removeItem = (dataTypeKey === 'file' ? removeFile : removeUser) as (
    item: AnyDataType
  ) => void;

  return {
    selection,
    addItem,
    removeItem,
  };
};
