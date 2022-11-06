import { Table, ScrollArea } from "@mantine/core";
import useDatabase from "../hooks/useDatabase";
import TableWordRow from "./TableWordRow";

export function TableWords() {
  const { words, orderByWord } = useDatabase();

  const rows = orderByWord(words)?.map((word, position) => {
    return <TableWordRow key={position} word={word} position={position} />;
  });

  return (
    <ScrollArea
      sx={{
        zoom: 0.85,
      }}
    >
      <Table verticalSpacing="xs">
        <thead>
          <tr>
            <th></th>
            <th>Português</th>
            <th>Umbundo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
