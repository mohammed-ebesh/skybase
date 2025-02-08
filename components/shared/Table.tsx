import * as React from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

// Helper function to normalize Arabic text
const normalizeArabicText = (text: string) => {
  return text
    .normalize("NFKC")
    .replace(
      /[\u064B-\u0652\u0670\u0671\u06D5\u06A9\u0670\u0653\u0679\u064D\u06C7\u0679\u0631\u0648\u064A\u064A]/g,
      ""
    )
    .replace(/أ|إ|آ|ى/g, "ا")
    .toLowerCase();
};

interface TableComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<any>[]; // Columns for the table
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[]; // Data for the table
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableAction?: (row: any) => React.ReactNode; // Optional custom action for each row
}

const TableComponent: React.FC<TableComponentProps> = ({
  columns,
  data,
  tableAction,
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const [pageIndex, setPageIndex] = React.useState(0); // Current page

  const table = useReactTable({
    data,
    columns: [
      ...columns, // Main columns
      {
        id: "actions",
        header: "تفاصيل", // Action column header
        cell: ({ row }) => (
          <div className="px-2">
            {tableAction ? tableAction(row.original) : null}
          </div>
        ),
        enableHiding: false,
      },
    ],
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination: { pageIndex, pageSize: 7 },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: (row, columnId, filterValue) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      columnId && null;
      const normalizedFilter = normalizeArabicText(filterValue.toString());

      return row.getAllCells().some((cell) => {
        const cellValue = String(cell.getValue());
        const normalizedCellValue = normalizeArabicText(cellValue);
        return normalizedCellValue.includes(normalizedFilter);
      });
    },
  });

  return (
    <div className="">
      <div className="flex items-center mb-2">
        <Input
          placeholder="بحث ..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="w-full md:w-5/12 h-7 py-0.5 focus:outline-none rounded-[5px] "
        />
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table className=" bg-white whitespace-nowrap overflow-x-auto">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-xs px-2 py-3 text-right md:text-sm min-w-fit"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-2 py-3 text-right text-xs md:text-sm min-w-fit"
                    >
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
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  لايوجد نتائج متطابقة
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="space-x-2 flex items-center justify-end gap-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={pageIndex === 0}
        >
          الصفحة السابقة
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={pageIndex >= table.getPageCount() - 1}
        >
          الصفحة التالية
        </Button>
      </div>
    </div>
  );
};

export default TableComponent;
