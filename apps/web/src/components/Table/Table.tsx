import { useNavigate } from "react-router-dom";
import type { Column } from "../../types/column";
import { Button } from "../Button/ButtonElements";
import {
  TableBody,
  StyledTable,
  TableHeader,
  TableHeaderCell,
  TableCell,
  TableRow,
  TableWrapper,
} from "./TableElements";

type TableProps<T> = {
  name: string;
  columns: Column<T>[];
  rows: T[];
};

export const Table = <T extends { id: string }>({
  name,
  columns,
  rows,
}: TableProps<T>) => {
  const navigate = useNavigate();

  const handleUpdate = (id: string) => {
    navigate(`/${name}/update/${id}`);
  };

  return (
    <TableWrapper>
      <StyledTable>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHeaderCell key={column.header}>
                {column.header}
              </TableHeaderCell>
            ))}
            <TableHeaderCell>Edit</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1}>
                No {name} found
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.header}>{column.cell(row)}</TableCell>
                ))}
                <TableCell>
                  <Button onClick={() => handleUpdate(row.id)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </StyledTable>
    </TableWrapper>
  );
};
