import { useTable, useSortBy } from "react-table";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Table as CTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Button,
} from "@chakra-ui/react";

export default function Table({ columns, data }) {
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }) => (
          <Button
            onClick={() =>
              alert(
                "Editing: " + row.values.itemno + "➡️" + row.values.stockcode
              )
            }
            colorScheme="teal"
            size="xs"
          >
            Edit
          </Button>
        ),
      },
    ]);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy,
      tableHooks
    );

  // Render UI
  return (
    <CTable variant="striped" colorScheme="gray" size="sm" {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <chakra.span pl="4">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label="sorted descending" />
                    ) : (
                      <TriangleUpIcon aria-label="sorted ascending" />
                    )
                  ) : null}
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>;
              })}
            </Tr>
          );
        })}
      </Tbody>
    </CTable>
  );
}
