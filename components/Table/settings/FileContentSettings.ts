import { ColumnDef } from '@tanstack/react-table';
import { DataTypeKeys, FileColumnIds } from '../enums';
import { DSFile } from '@/types/DSItems/DSFile';
import NameItemCell from '../views/TableView/Body/Columns/File/NameItem/NameItemCell';
import { DSUser } from '@/types/DSUsers/DSUser';
import FileRowCell from '../views/RowView/Rows/File/FileRowCell';
import FileTileCell from '../views/TileView/Tiles/File/FileTileCell';
import CommonDateCell from '../views/TableView/Body/Columns/Common/CommonDateCell';
import CommonStringCell from '../views/TableView/Body/Columns/Common/CommonStringCell';
import { ContentSettings } from '../types';
import CommonContextBtnCell from '../views/TableView/Body/Columns/Common/CommonContextBtnCell';

export const FileContentSettings: ContentSettings<DataTypeKeys.File> = {
  dataTypeKey: DataTypeKeys.File,
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
          cell: NameItemCell,
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
          cell: CommonDateCell,
        },
        {
          id: FileColumnIds.DateUpdated,
          accessorKey: 'updated',
          header: 'Updated',
          isDefaultVisible: true,
          defaultSize: 15,
          cell: CommonDateCell,
        },
        {
          id: FileColumnIds.Size,
          accessorKey: 'contentLength',
          header: 'Size',
          isDefaultVisible: true,
          defaultSize: 15,
          cell: CommonStringCell,
        },
        {
          id: FileColumnIds.Type,
          accessorKey: 'fileType',
          header: 'Type',
          isDefaultVisible: true,
          defaultSize: 15,
          cell: CommonStringCell,
        },
        {
          id: 'contextBtn',
          header: 'o',
          enableHiding: false,
          size: 0,
          cell: CommonContextBtnCell,
        },
      ] as ColumnDef<DSFile, unknown>[],
    },

    row: [
      {
        id: 'file-row',
        accessorFn: (item) => item,
        cell: FileRowCell,
      },
    ] as ColumnDef<DSFile, DSFile>[],

    tile: [
      {
        id: 'file-tile',
        accessorFn: (item) => item,
        cell: FileTileCell,
      },
    ] as ColumnDef<DSFile, DSFile>[],
  },
};
