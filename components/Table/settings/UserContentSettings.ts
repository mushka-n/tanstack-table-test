import { ContentDefs, ContentSettings } from '../types/contentSettings';

import { CommonCells, UserCells } from '../views/TableView/Body/Columns';
import Rows from '../views/RowView/Rows';

//

export const userDefaultContentSettings = {
  availableViews: ['table', 'row'],
  defaultView: 'table',

  columns: [
    { id: 'user-column-name', isVisible: true, size: 100 / 3 },
    { id: 'user-column-type', isVisible: true, size: 100 / 3 },
    { id: 'user-column-email', isVisible: true, size: 100 / 3 },
  ],
  row: 'user-row-default',
} as const satisfies ContentSettings<'user', ['table', 'row']>;

//

export const userContentDefs = {
  table: [
    {
      id: 'user-column-name',
      accessorKey: 'displayName',
      header: 'Name',
      meta: { isInherent: true, isCheckbox: true },
      cell: CommonCells.CommonStringCell,
    },
    {
      id: 'user-column-type',
      accessorKey: 'role',
      header: 'Author',
      cell: UserCells.UserTypeCell,
    },
    {
      id: 'user-column-groups',
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
      id: 'user-column-contextBtn',
      header: 'o',
      enableHiding: false,
      meta: { isInherent: true, fixedWidthPx: 40 },
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
