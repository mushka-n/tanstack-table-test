import { CommonCells, FileCells } from '../views/TableView/Body/Columns';
import Rows from '../views/RowView/Rows';
import Tiles from '../views/TileView/Tiles';
import { ContentDefs, ContentSettings } from '../types/contentSettings';

//

export const fileDefaultContentSettings = {
  availableViews: ['table', 'row', 'tile'],
  defaultView: 'table',

  columns: [
    { id: 'file-column-title', isVisible: true, size: 40 },
    { id: 'file-column-author', isVisible: false, size: -15 },
    { id: 'file-column-dateCreated', isVisible: true, size: 15 },
    { id: 'file-column-dateUpdated', isVisible: true, size: 15 },
    { id: 'file-column-size', isVisible: true, size: 15 },
    { id: 'file-column-type', isVisible: true, size: 15 },
  ],
  row: 'file-row-default',
  tile: 'file-tile-default',
} as const satisfies ContentSettings<'file', ['table', 'row', 'tile']>;

//

export const fileContentDefs = {
  table: [
    {
      id: 'file-column-title',
      accessorFn: (item) => item,
      header: 'Name',
      enableHiding: false,
      meta: { isInherent: true, isCheckbox: true },
      cell: FileCells.FileTitleCell,
    },
    {
      id: 'file-column-room',
      accessorKey: 'roomName',
      header: 'Room',
      cell: CommonCells.CommonStringCell,
    },
    {
      id: 'file-column-author',
      accessorKey: 'createdBy',
      header: 'Author',
      cell: ({ getValue }) => getValue().displayName,
    },
    {
      id: 'file-column-dateCreated',
      accessorKey: 'created',
      header: 'Created',
      cell: CommonCells.CommonDateCell,
    },
    {
      id: 'file-column-dateUpdated',
      accessorKey: 'updated',
      header: 'Updated',
      cell: CommonCells.CommonDateCell,
    },
    {
      id: 'file-column-size',
      accessorKey: 'contentLength',
      header: 'Size',
      cell: CommonCells.CommonStringCell,
    },
    {
      id: 'file-column-type',
      accessorKey: 'fileType',
      header: 'Type',
      enableResizing: false,
      cell: CommonCells.CommonStringCell,
    },
    {
      id: 'file-column-contextBtn',
      header: 'o',
      enableHiding: false,
      enableResizing: false,
      meta: { isInherent: true, fixedWidthPx: 40 },
      cell: CommonCells.CommonContextBtnCell,
    },
  ],

  row: [
    {
      id: 'file-row-default',
      accessorFn: (item) => item,
      cell: Rows.FileRow,
    },
    {
      id: 'file-row-trash',
      accessorFn: (item) => item,
      cell: Rows.FileRow,
    },
  ],

  tile: [
    {
      id: 'file-tile-default',
      accessorFn: (item) => item,
      cell: Tiles.FileTile,
    },
  ],
} as const satisfies ContentDefs<'file', ['table', 'row', 'tile']>;
