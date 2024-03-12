import { ContentDefs, ContentSettings } from '../types/contentSettings';

import { CommonCells, UserCells } from '../views/TableView/Body/Columns';
import Rows from '../views/RowView/Rows';

//

export const userDefaultContentSettings = {
  availableViews: ['table', 'row'],
  defaultView: 'table',

  columns: [
    { id: 'user-name', isVisible: true, size: 100 / 3 },
    { id: 'user-type', isVisible: true, size: 100 / 3 },
    { id: 'user-column-email', isVisible: true, size: 100 / 3 },
  ],
  row: 'user-row-default',
} as const satisfies ContentSettings<'user', ['table', 'row']>;

//

export const userContentDefs = {
  table: [
    {
      id: 'user-name',
      accessorKey: 'displayName',
      header: 'Name',
      meta: { isCheckbox: true },
      cell: CommonCells.CommonStringCell,
    },
    {
      id: 'user-type',
      accessorKey: 'role',
      header: 'Type',
      cell: UserCells.UserTypeCell,
    },
    {
      id: 'user-groups',
      accessorKey: 'groups',
      header: 'Groups',
      cell: UserCells.UserGroupsCell,
    },
    {
      id: 'user-column-email',
      accessorKey: 'email',
      header: 'Email',
      cell: CommonCells.CommonStringCell,
    },
    {
      id: 'user-contextBtn',
      header: 'o',
      enableHiding: false,
      meta: { isContextBtn: true, isInherent: true, fixedWidthPx: 40 },
      cell: CommonCells.CommonContextBtnCell,
    },
  ],

  row: [
    {
      id: 'user-row-default',
      accessorFn: (item) => item,
      cell: Rows.UserRow,
    },
  ],
} as const satisfies ContentDefs<'user', ['table', 'row']>;
