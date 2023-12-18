import { CellContext } from '@tanstack/react-table';
import { AccessorKeys } from '../../index.constants';
import { DSUser } from '../../../../types/DSUsers/DSUser';
import {
  DSUserRole,
  getDSUserRoleTranslation,
} from '../../../../types/DSUsers/DSUserRole';

const DEFAULT_SIZE = undefined;
const MIN_SIZE = 10;
const MAX_SIZE = 100;

const TypeUserColumn = (savedColumnSize?: number) => {
  return {
    accessorKey: AccessorKeys.TypeUser,
    header: 'Type',

    size: savedColumnSize ?? DEFAULT_SIZE,
    minSize: MIN_SIZE,
    maxSize: MAX_SIZE,

    cell: ({ getValue }: CellContext<DSUser, DSUserRole>) => {
      return <div>{getDSUserRoleTranslation(getValue())}</div>;
    },
  };
};

export default TypeUserColumn;
