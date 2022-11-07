import { Text, Box, Table, ScrollArea, Input } from "@mantine/core";
import { useDebouncedValue, useInputState } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons";
import useDatabase from "../hooks/useDatabase";
import TableWordRow from "./TableWordRow";
import { useMemo } from "react";

export function TableWords() {
  const { words, orderByWord } = useDatabase();
  const [search, handleSearch] = useInputState("");
  const [searchDebounced] = useDebouncedValue(search, 1000);

  const wordsFiltered = useMemo(() => {
    return words?.filter((word) => {
      return word.pt.includes(search) || word.um.includes(search);
    });
  }, [searchDebounced]);

  const rows = useMemo(() => {
    return orderByWord(wordsFiltered)?.map((word, position) => {
      return (
        <TableWordRow
          key={position}
          word={word}
          position={position}
          search={search}
        />
      );
    });
  }, [wordsFiltered]);

  return (
    <div>
      <Box
        sx={{
          position: "fixed",
          bottom: 10,
          left: 10,
          right: 10,
          zIndex: 1,
        }}
      >
        <Input
          icon={<IconSearch size={16} />}
          value={search}
          onChange={handleSearch}
          placeholder="Pesquise alguma palavra (português/umbundo)"
          sx={{
            maxWidth: 400,
          }}
        />
      </Box>
      <ScrollArea
        sx={{
          zoom: 0.85,
        }}
      >
        {(wordsFiltered?.length || 0) > 0 ? (
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
        ) : (
          <Text size="md" color="dimmed">
            Nenhum resultado encontrado
          </Text>
        )}
      </ScrollArea>
    </div>
  );
}
