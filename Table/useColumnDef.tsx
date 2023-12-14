import { ColumnDef } from '@tanstack/react-table';
import { AnyItemType, AnyItemTypeName, CellKeys } from './types';
import { useGetTableSizes } from './useTableSizing';

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

export const useColumnDef = (
  tableId: string,
  itemTypeName: AnyItemTypeName = 'file'
) => {
  const columnSizes = useGetTableSizes(tableId);

  const columns: ColumnDef<AnyItemType>[] = [
    {
      accessorKey: 'title',
      header: 'Name',
      size: columnSizes ? columnSizes['title'] : 120,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'createdby',
      size: columnSizes ? columnSizes['createdby'] : 120,
      header: 'Author',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'created',
      size: columnSizes ? columnSizes['created'] : 120,
      header: 'Created',
      cell: (info) => info.getValue().toDateString(),
    },
    {
      accessorKey: 'updated',
      size: columnSizes ? columnSizes['updated'] : 120,
      header: 'Modified',
      cell: (info) => info.getValue().toDateString(),
    },
    {
      accessorKey: 'contentLength',
      size: columnSizes ? columnSizes['contentLength'] : 120,
      header: 'Size',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'fileType',
      size: columnSizes ? columnSizes['fileType'] : 120,
      header: 'Type',
      cell: (info) => info.getValue(),
    },
  ];

  return columns;
};

export default useColumnDef;
