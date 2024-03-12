import { CommonCells, FileCells } from '../views/TableView/Body/Columns';
import Rows from '../views/RowView/Rows';
import Tiles from '../views/TileView/Tiles';
import { ContentDefs, ContentSettings } from '../types/contentSettings';

//

export const fileDefaultContentSettings = {
  availableViews: ['table', 'row', 'tile'],
  defaultView: 'table',

  columns: [
    { id: 'file-title', isVisible: true, size: 40 },
    { id: 'file-author', isVisible: false, size: -15 },
    { id: 'file-dateCreated', isVisible: true, size: 15 },
    { id: 'file-dateUpdated', isVisible: true, size: 15 },
    { id: 'file-size', isVisible: true, size: 15 },
    { id: 'file-type', isVisible: true, size: 15 },
  ],
  row: 'file-row-default',
  tile: 'file-tile-default',
} as const satisfies ContentSettings<'file', ['table', 'row', 'tile']>;

//

export const fileContentDefs = {
  table: [
    {
      id: 'file-title',
      accessorKey: 'title',
      header: 'Name',
      enableHiding: false,
      meta: { isInherent: true, isCheckbox: true },
      cell: FileCells.FileTitleCell,
    },
    {
      id: 'file-room',
      accessorKey: 'roomName',
      header: 'Room',
      cell: CommonCells.CommonStringCell,
    },
    {
      id: 'file-author',
      accessorKey: 'createdBy',
      header: 'Author',
      cell: ({ getValue }) => getValue().displayName,
    },
    {
      id: 'file-dateCreated',
      accessorKey: 'created',
      header: 'Created',
      cell: CommonCells.CommonDateCell,
    },
    {
      id: 'file-dateUpdated',
      accessorKey: 'updated',
      header: 'Updated',
      cell: CommonCells.CommonDateCell,
    },
    {
      id: 'file-dateErasure',
      accessorKey: 'erasure',
      header: 'Erasure',
      cell: CommonCells.CommonDateCell,
    },
    {
      id: 'file-size',
      accessorKey: 'contentLength',
      header: 'Size',
      cell: CommonCells.CommonStringCell,
    },
    {
      id: 'file-type',
      accessorKey: 'fileType',
      header: 'Type',
      enableResizing: false,
      cell: CommonCells.CommonStringCell,
    },
    {
      id: 'file-contextBtn',
      header: 'o',
      enableHiding: false,
      enableResizing: false,
      meta: { isContextBtn: true, isInherent: true, fixedWidthPx: 40 },
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
