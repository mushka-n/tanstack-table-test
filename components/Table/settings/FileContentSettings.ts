import { ColumnDef } from '@tanstack/react-table';
import { DSFile } from '@/types/DSItems/DSFile';
import { DSUser } from '@/types/DSUsers/DSUser';
import { CommonCells, FileCells } from '../views/TableView/Body/Columns';
import Rows from '../views/RowView/Rows';
import Tiles from '../views/TileView/Tiles';
import { ContentViews, ContentSettings } from '../types/contentSettings';
import { ContentDefIds } from '../constants/contentDefIds';

//

const FileColumnIds = ContentDefIds.file.columns;
const FileRowIds = ContentDefIds.file.rows;
const FileTileIds = ContentDefIds.file.tiles;

//

export const FileDefaultContentSettings: ContentSettings<'file'> = {
  availableViews: ['table', 'row', 'tile'],
  defaultView: 'table',

  columns: [
    { id: FileColumnIds.title, isVisible: true, size: 40 },
    { id: FileColumnIds.author, isVisible: false, size: -15 },
    { id: FileColumnIds.dateCreated, isVisible: true, size: 15 },
    { id: FileColumnIds.dateUpdated, isVisible: true, size: 15 },
    { id: FileColumnIds.size, isVisible: true, size: 15 },
    { id: FileColumnIds.type, isVisible: true, size: 15 },
  ],
  row: FileRowIds.default,
  tile: FileTileIds.default,
};

//

export const FileContentViews: ContentViews<DSFile> = {
  table: [
    {
      id: FileColumnIds.title,
      accessorFn: (item) => item,
      header: 'Name',
      cell: FileCells.FileTitleCell,
    },
    {
      id: FileColumnIds.room,
      accessorKey: 'roomName',
      header: 'Room',
      cell: CommonCells.CommonStringCell,
    } as ColumnDef<DSFile, string>,
    {
      id: FileColumnIds.author,
      accessorKey: 'createdBy',
      header: 'Author',
      cell: ({ getValue }) => getValue().displayName,
    } as ColumnDef<DSFile, DSUser>,
    {
      id: FileColumnIds.dateCreated,
      accessorKey: 'created',
      header: 'Created',
      cell: CommonCells.CommonDateCell,
    },
    {
      id: FileColumnIds.dateUpdated,
      accessorKey: 'updated',
      header: 'Updated',
      cell: CommonCells.CommonDateCell,
    },
    {
      id: FileColumnIds.size,
      accessorKey: 'contentLength',
      header: 'Size',
      cell: CommonCells.CommonStringCell,
    },
    {
      id: FileColumnIds.type,
      accessorKey: 'fileType',
      header: 'Type',
      cell: CommonCells.CommonStringCell,
    },
    {
      id: FileColumnIds.contextBtn,
      header: 'o',
      enableHiding: false,
      size: 0,
      cell: CommonCells.CommonContextBtnCell,
    },
  ] as ColumnDef<DSFile, unknown>[],

  row: [
    {
      id: FileRowIds.default,
      accessorFn: (item) => item,
      cell: Rows.FileRow,
    },
    {
      id: FileRowIds.trash,
      accessorFn: (item) => item,
      cell: Rows.FileRow,
    },
  ] as ColumnDef<DSFile, DSFile>[],

  tile: [
    {
      id: FileTileIds.default,
      accessorFn: (item) => item,
      cell: Tiles.FileTile,
    },
  ] as ColumnDef<DSFile, DSFile>[],
};
