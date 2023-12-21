import { CellContext } from '@tanstack/react-table';
import { AccessorKeys } from '../../index.constants';
import { DSUser } from '../../../../types/DSUsers/DSUser';
import {
  DSUserRole,
  getDSUserRoleTranslation,
} from '../../../../types/DSUsers/DSUserRole';

const TypeUserColumn = () => {
  return {
    accessorKey: AccessorKeys.TypeUser,
    header: 'Type',

    cell: ({ getValue }: CellContext<DSUser, DSUserRole>) => {
      return <div>{getDSUserRoleTranslation(getValue())}</div>;
    },
  };
};

export default TypeUserColumn;
