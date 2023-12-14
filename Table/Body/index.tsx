import { Table, flexRender } from '@tanstack/react-table';
import { AnyItemType } from '../types';

interface TableBodyProps {
  table: Table<AnyItemType>;
}

const TableBody = ({ table }: TableBodyProps) => {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id}>
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
