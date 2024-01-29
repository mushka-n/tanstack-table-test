import { ColumnDef } from '@tanstack/react-table';
import { UserColumnIds } from '../enums';
import { DSUser } from '@/types/DSUsers/DSUser';
import { ContentSettings } from '../types';

import { CommonCells, UserCells } from '../views/TableView/Body/Columns';
import Rows from '../views/RowView/Rows';
import Tiles from '../views/TileView/Tiles';

export const UserContentSettings: ContentSettings<'user'> = {
  dataTypeKey: 'user',
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
          cell: CommonCells.CommonStringCell,
        },
        {
          id: UserColumnIds.Type,
          accessorKey: 'role',
          header: 'Author',
          isDefaultVisible: true,
          defaultSize: 100 / 3,
          cell: UserCells.UserTypeCell,
        },
        {
          id: UserColumnIds.Email,
          accessorKey: 'email',
          header: 'Email',
          isDefaultVisible: true,
          defaultSize: 100 / 3,
          cell: CommonCells.CommonStringCell,
        },
        {
          id: 'contextBtn',
          header: 'o',
          enableHiding: false,
          size: 0,
          cell: CommonCells.CommonContextBtnCell,
        },
      ] as ColumnDef<DSUser, unknown>[],
    },

    row: [
      {
        id: 'file-row',
        accessorKey: 'displayName',
        accessorFn: (item) => item,
        cell: Rows.UserRow,
      },
    ] as ColumnDef<DSUser, DSUser>[],

    tile: [
      {
        id: 'file-tile',
        accessorKey: 'displayName',
        accessorFn: (item) => item,
        cell: Tiles.UserTile,
      },
    ] as ColumnDef<DSUser, DSUser>[],
  },
};
