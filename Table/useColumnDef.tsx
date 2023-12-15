import { ColumnDef } from '@tanstack/react-table';
import { AnyItemType, AnyItemTypeName, CellKeys } from './types';
import { useGetTableSizes } from './useTableSizing';
import NameItemColumn from './Cells/NameItem/column';

const getColumnsArrayByTypeName = (itemTypeName: AnyItemTypeName = 'file') => {
  if (itemTypeName === 'file')
    return [
      'title',
      'createdby',
      'created',
      'updated',
      'contentLength',
      'fileType',
    ];
};

export const getFileColumnDef = (
  columnSizes: Record<string, number> | null
) => {
  const columns: ColumnDef<AnyItemType>[] = [
    NameItemColumn(columnSizes?.['title']),
    {
      accessorKey: 'createdby',
      size: columnSizes?.['createdby'],
      header: 'Author',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'created',
      size: columnSizes?.['created'],
      header: 'Created',
      cell: (info) => info.getValue().toDateString(),
    },
    {
      accessorKey: 'updated',
      size: columnSizes?.['updated'],
      header: 'Modified',
      cell: (info) => info.getValue().toDateString(),
    },
    {
      accessorKey: 'contentLength',
      size: columnSizes?.['contentLength'],
      header: 'Size',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'fileType',
      size: columnSizes?.['fileType'],
      header: 'Type',
      cell: (info) => info.getValue(),
    },
  ];

  return columns;
};

export const useColumnDef = (
  tableId: string,
  itemTypeName: AnyItemTypeName = 'file'
) => {
  const columnSizes = useGetTableSizes(tableId);

  return getFileColumnDef(columnSizes);
};

export default useColumnDef;
