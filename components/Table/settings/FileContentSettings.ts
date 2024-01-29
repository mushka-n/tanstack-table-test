import { ColumnDef } from '@tanstack/react-table';
import { FileColumnIds } from '../enums';
import { DSFile } from '@/types/DSItems/DSFile';
import { DSUser } from '@/types/DSUsers/DSUser';
import { ContentSettings } from '../types';
import { CommonCells, FileCells } from '../views/TableView/Body/Columns';
import Rows from '../views/RowView/Rows';
import Tiles from '../views/TileView/Tiles';

export const FileContentSettings: ContentSettings<'file'> = {
  dataTypeKey: 'file',
  defaultView: 'table',

  views: {
    table: {
      columns: [
        {
          id: FileColumnIds.Title,
          accessorFn: (item) => item,
          header: 'Name',
          isDefaultVisible: true,
          defaultSize: 40,
          cell: FileCells.FileTitleCell,
        },
        {
          id: FileColumnIds.Author,
          accessorKey: 'createdBy',
          header: 'Author',
          isDefaultVisible: false,
          defaultSize: -15,
          cell: ({ getValue }) => getValue().displayName,
        } as ColumnDef<DSFile, DSUser>,
        {
          id: FileColumnIds.DateCreated,
          accessorKey: 'created',
          header: 'Created',
          isDefaultVisible: true,
          defaultSize: 15,
          cell: CommonCells.CommonDateCell,
        },
        {
          id: FileColumnIds.DateUpdated,
          accessorKey: 'updated',
          header: 'Updated',
          isDefaultVisible: true,
          defaultSize: 15,
          cell: CommonCells.CommonDateCell,
        },
        {
          id: FileColumnIds.Size,
          accessorKey: 'contentLength',
          header: 'Size',
          isDefaultVisible: true,
          defaultSize: 15,
          cell: CommonCells.CommonStringCell,
        },
        {
          id: FileColumnIds.Type,
          accessorKey: 'fileType',
          header: 'Type',
          isDefaultVisible: true,
          defaultSize: 15,
          cell: CommonCells.CommonStringCell,
        },
        {
          id: 'contextBtn',
          header: 'o',
          enableHiding: false,
          size: 0,
          cell: CommonCells.CommonContextBtnCell,
        },
      ] as ColumnDef<DSFile, unknown>[],
    },

    row: [
      {
        id: 'file-row',
        accessorFn: (item) => item,
        cell: Rows.FileRow,
      },
    ] as ColumnDef<DSFile, DSFile>[],

    tile: [
      {
        id: 'file-tile',
        accessorFn: (item) => item,
        cell: Tiles.FileTile,
      },
    ] as ColumnDef<DSFile, DSFile>[],
  },
};
