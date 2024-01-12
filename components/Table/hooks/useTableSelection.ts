import useFilesStore from '@/stores/useFilesStore';
import { AnyDataType, AnyDataTypeKey } from '../types/dataType';
import useUsersStore from '@/stores/useUsersStore';

export const useTableSelection = (
  dataTypeKey: AnyDataTypeKey
): {
  selection: AnyDataType[] | null;
  setSelection: ((newSelection: AnyDataType[]) => void) | null;
} => {
  // File
  const filesSelection = useFilesStore((state) => state.selection);
  const setFileSelection = useFilesStore((state) => state.setSelection);

  // User
  const userSelection = useUsersStore((state) => state.selection);
  const setUserSelection = useUsersStore((state) => state.setSelection);

  const selection = (
    dataTypeKey === 'file'
      ? filesSelection
      : dataTypeKey === 'user'
        ? userSelection
        : null
  ) as AnyDataType[];

  const setSelection = (
    dataTypeKey === 'file'
      ? setFileSelection
      : dataTypeKey === 'user'
        ? setUserSelection
        : null
  ) as ((newSelection: AnyDataType[]) => void) | null;

  return {
    selection,
    setSelection,
  };
};
