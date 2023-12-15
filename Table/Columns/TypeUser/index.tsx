import { CellContext } from '@tanstack/react-table';
import { AccessorKeys } from '../../index.constants';
import { DSUser } from '../../../constants/DSUsers/DSUser';
import {
  DSUserRole,
  getDSUserRoleTranslation,
} from '../../../constants/DSUsers/DSUserRole';

const DEFAULT_SIZE = 120;
const MIN_SIZE = 80;
const MAX_SIZE = 480;

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
