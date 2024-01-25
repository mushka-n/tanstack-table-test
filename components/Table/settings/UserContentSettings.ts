import { ColumnDef } from '@tanstack/react-table';
import { DataTypeKeys, UserColumnIds } from '../enums';
import { DSUser } from '@/types/DSUsers/DSUser';
import CommonStringCell from '../views/TableView/Body/Columns/Common/CommonStringCell';
import { ContentSettings } from '../types';
import { DSUserRole } from '@/types/DSUsers/DSUserRole';
import CommonContextBtnCell from '../views/TableView/Body/Columns/Common/CommonContextBtnCell';

export const UserContentSettings: ContentSettings<DataTypeKeys.User> = {
  dataTypeKey: DataTypeKeys.User,
  defaultView: 'table',

  views: {
    table: {
      columns: [
        {
          id: UserColumnIds.Name,
          accessorKey: 'displayName',
          header: 'Name',
          isDefaultVisible: true,
          enableHiding: false,
          defaultSize: 100 / 3,
          cell: CommonStringCell,
        },
        {
          id: UserColumnIds.Type,
          accessorKey: 'role',
          header: 'Author',
          isDefaultVisible: true,
          defaultSize: 100 / 3,
          cell: CommonStringCell,
        } as ColumnDef<DSUser, DSUserRole>,
        {
          id: UserColumnIds.Email,
          accessorKey: 'email',
          header: 'Email',
          isDefaultVisible: true,
          defaultSize: 100 / 3,
          cell: CommonStringCell,
        } as ColumnDef<DSUser, string>,
        {
          id: 'contextBtn',
          header: 'o',
          enableHiding: false,
          size: 0,
          cell: CommonContextBtnCell,
        },
      ] as ColumnDef<DSUser, unknown>[],
    },

    row: [
      {
        id: 'file-row',
        accessorKey: 'displayName',
        // accessorFn: (item) => item,
        cell: CommonStringCell,
      },
    ] as ColumnDef<DSUser, DSUser>[],

    tile: [
      {
        id: 'file-tile',
        accessorKey: 'displayName',
        // accessorFn: (item) => item.displayName,
        cell: CommonStringCell,
      },
    ] as ColumnDef<DSUser, DSUser>[],
  },
};
