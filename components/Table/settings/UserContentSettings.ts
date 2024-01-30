import { ColumnDef } from '@tanstack/react-table';
import { DSUser } from '@/types/DSUsers/DSUser';
import { ContentViews, ContentSettings } from '../types/contentSettings';

import { CommonCells, UserCells } from '../views/TableView/Body/Columns';
import Rows from '../views/RowView/Rows';
import { ContentDefIds } from '../constants/contentDefIds';

//

const UserColumnIds = ContentDefIds.user.columns;
const UserRowIds = ContentDefIds.user.rows;

//

export const UserDefaultContentSettings: ContentSettings<'user'> = {
  availableViews: ['table', 'row'],
  defaultView: 'table',

  columns: [
    { id: UserColumnIds.Name, isVisible: true, size: 100 / 3 },
    { id: UserColumnIds.Type, isVisible: true, size: 100 / 3 },
    { id: UserColumnIds.Email, isVisible: true, size: 100 / 3 },
  ],
  row: UserRowIds.Default,
} as const;

//

export const UserContentViews: ContentViews<DSUser> = {
  table: [
    {
      id: UserColumnIds.Name,
      accessorKey: 'displayName',
      header: 'Name',
      cell: CommonCells.CommonStringCell,
    },
    {
      id: UserColumnIds.Type,
      accessorKey: 'role',
      header: 'Author',
      cell: UserCells.UserTypeCell,
    },
    {
      id: UserColumnIds.Email,
      accessorKey: 'email',
      header: 'Email',
      cell: CommonCells.CommonStringCell,
    },
    {
      id: UserColumnIds.ContextBtn,
      header: 'o',
      enableHiding: false,
      size: 0,
      cell: CommonCells.CommonContextBtnCell,
    },
  ] as ColumnDef<DSUser, unknown>[],

  row: [
    {
      id: UserRowIds.Default,
      accessorFn: (item) => item,
      cell: Rows.UserRow,
    },
  ] as ColumnDef<DSUser, DSUser>[],

  tile: [],
} as const;
