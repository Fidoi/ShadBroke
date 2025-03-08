'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generatePaginationNumbers } from '@/utils';

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  filterKey: keyof T;
  filterPlaceholder: string;
  pageSize?: number;
  rowId?: keyof T;
}

export default function SquemeTable<T>({
  data,
  columns,
  filterKey,
  filterPlaceholder,
  pageSize = 10,
  rowId = 'id' as keyof T,
}: DataTableProps<T>) {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([]);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      String(item[filterKey]).toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter, filterKey]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  const sortedData = table.getSortedRowModel().rows.map((row) => row.original);
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginationNumbers = generatePaginationNumbers(page + 1, totalPages);
  const paginatedData = useMemo(() => {
    const startIndex = page * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, page, pageSize]);

  useEffect(() => {
    setPage(0);
  }, [filter]);

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <Input
          placeholder={filterPlaceholder}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className='max-w-sm'
        />
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {paginatedData.length ? (
              paginatedData.map((item) => (
                <TableRow key={String(item[rowId])}>
                  {table
                    .getRowModel()
                    .rows.find((r) => r.original[rowId] === item[rowId])
                    ?.getVisibleCells()
                    .map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getHeaderGroups()[0].headers.length}
                  className='h-24 text-center'
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-between text-sm text-muted-foreground'>
        <span>
          Mostrando {page * pageSize + 1} -{' '}
          {Math.min((page + 1) * pageSize, sortedData.length)} de{' '}
          {sortedData.length} elementos
        </span>

        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='sm'
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            Anterior
          </Button>

          {paginationNumbers.map((num, index) => (
            <Button
              key={index}
              variant={num === page + 1 ? 'default' : 'outline'}
              disabled={num === '...'}
              onClick={() => typeof num === 'number' && setPage(num - 1)}
            >
              {num}
            </Button>
          ))}

          <Button
            variant='outline'
            size='sm'
            disabled={page >= totalPages - 1}
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
