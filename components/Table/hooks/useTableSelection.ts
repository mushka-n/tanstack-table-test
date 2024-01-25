import useFilesStore from '@/stores/useFilesStore';
import { AnyDataTypeKey, DataTypeByKey } from '../types';
import useUsersStore from '@/stores/useUsersStore';
import { DataTypeKeys } from '../enums';

type useTableSelectionResult<DTK extends AnyDataTypeKey> = {
  selection: DataTypeByKey<DTK>[] | null;
  setSelection: ((newSelection: DataTypeByKey<DTK>[]) => void) | null;
};

export const useTableSelection = <DTK extends AnyDataTypeKey>(
  dataTypeKey: DTK
): useTableSelectionResult<DTK> => {
  const fileSelection = useTableFileSelection();
  const userSelection = useTableUserSelection();

  switch (dataTypeKey) {
    case DataTypeKeys.File:
      return fileSelection as unknown as useTableSelectionResult<DTK>;
    case DataTypeKeys.User:
      return userSelection as unknown as useTableSelectionResult<DTK>;
    default:
      return {
        selection: null,
        setSelection: null,
      };
  }
};

const useTableFileSelection =
  (): useTableSelectionResult<DataTypeKeys.File> => {
    const selection = useFilesStore((state) => state.selection);
    const setSelection = useFilesStore((state) => state.setSelection);
    return { selection, setSelection };
  };

const useTableUserSelection =
  (): useTableSelectionResult<DataTypeKeys.User> => {
    const selection = useUsersStore((state) => state.selection);
    const setSelection = useUsersStore((state) => state.setSelection);
    return { selection, setSelection };
  };
