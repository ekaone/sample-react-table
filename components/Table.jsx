import "regenerator-runtime/runtime";
import React, { useEffect, useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
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
  Input,
} from "@chakra-ui/react";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);

  return (
    <Input
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder={`${count} records...`}
    />
  );
}

export default function Table({ data }) {
  const columns = useMemo(
    () => [
      {
        Header: "No",
        accessor: "idx",
      },
      {
        Header: "Item No",
        accessor: "itemno",
      },
      {
        Header: "Stock Code",
        accessor: "stockcode",
      },
      {
        Header: "Part No",
        accessor: "partno",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Supplier A",
        columns: [
          {
            Header: "Quatity",
            accessor: "quantity",
          },
          {
            Header: "Price",
            accessor: "price",
          },
          ,
          {
            Header: "Lead Time",
            accessor: "leadtime",
          },
        ],
      },
      {
        Header: "Supplier B",
        columns: [
          {
            Header: "Quatity",
            accessor: "quantityb",
          },
          {
            Header: "Price",
            accessor: "priceb",
          },
          ,
          {
            Header: "Lead Time",
            accessor: "leadtimeb",
          },
        ],
      },
      {
        Header: "Supplier C",
        columns: [
          {
            Header: "Quatity",
            accessor: "quantityc",
          },
          {
            Header: "Price",
            accessor: "pricec",
          },
          ,
          {
            Header: "Lead Time",
            accessor: "leadtimec",
          },
        ],
      },
      {
        Header: "Result",
        accessor: "result",
      },
    ],
    []
  );

  // add a column for edit button
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    tableHooks
  );

  // Render UI
  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <CTable
        variant="striped"
        colorScheme="gray"
        size="sm"
        {...getTableProps()}
      >
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
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </CTable>
    </>
  );
}
