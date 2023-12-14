import { ColumnDef } from '@tanstack/react-table';
import { AnyItemType, AnyItemTypeName, CellKeys } from './types';
import { useGetTableSizes } from './useTableSizing';

const getColumnsArrayByTypeName = (itemTypeName: AnyItemTypeName = 'file') => {
  if (itemTypeName === 'file')
    return [
      CellKeys.TITLE,
      'createdby',
      'created',
      'updated',
      'contentLength',
      'fileType',
    ];
};

export const useColumnDef = (
  tableId: string,
  itemTypeName: AnyItemTypeName = 'file'
) => {
  const columnSizes = useGetTableSizes(tableId);

  const columns: ColumnDef<AnyItemType>[] = [
    {
      accessorKey: 'title',
      header: 'Name',
      size: columnSizes['title'],
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'createdby',
      size: columnSizes['createdby'],
      header: 'Author',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'created',
      size: columnSizes['created'],
      header: 'Created',
      cell: (info) => info.getValue().toDateString(),
    },
    {
      accessorKey: 'updated',
      size: columnSizes['updated'],
      header: 'Modified',
      cell: (info) => info.getValue().toDateString(),
    },
    {
      accessorKey: 'contentLength',
      size: columnSizes['contentLength'],
      header: 'Size',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'fileType',
      size: columnSizes['fileType'],
      header: 'Type',
      cell: (info) => info.getValue(),
    },
  ];

  return columns;
};

export default useColumnDef;
