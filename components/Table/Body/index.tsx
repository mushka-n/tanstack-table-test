import { Table, flexRender } from '@tanstack/react-table';
import { AnyDataType } from '../index.types';

interface TableBodyProps {
  table: Table<AnyDataType>;
}

const TableBody = ({ table }: TableBodyProps) => {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id} style={{ height: '48px' }}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
