import {
  Anchor,
  Center,
  Text,
  Box,
  Table,
  ScrollArea,
  Input,
} from "@mantine/core";
import { useDebouncedValue, useInputState } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons";
import useDatabase from "../hooks/useDatabase";
import TableWordRow from "./TableWordRow";
import { useMemo, useState } from "react";
import { selectShowItems } from "../store/App.selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { showMoreItems } from "../store/App.store";

// load more on scroll

export function TableWords() {
  const { words, orderByWord } = useDatabase();
  const [search, handleSearch] = useInputState("");
  const [searchDebounced] = useDebouncedValue(search, 1000);
  // const [showUntil, setShowUntil] = useState(ITEMS_PER_PAGE);
  const showUntil = useSelector(selectShowItems);
  const dispatch = useDispatch();

  const wordsFiltered = useMemo(() => {
    return words?.filter((word) => {
      return word.pt.includes(search) || word.um.includes(search);
    });
  }, [searchDebounced, words]);

  function showMoreWords() {
    dispatch(showMoreItems(null));
  }

  const rows = useMemo(() => {
    const words = orderByWord(wordsFiltered)?.slice(0, showUntil);
    return words?.map((word, position) => {
      return (
        <TableWordRow
          key={position}
          word={word}
          position={position}
          search={search}
        />
      );
    });
  }, [wordsFiltered, showUntil]);

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
      <Center mt={20}>
        <Anchor size="xs" onClick={showMoreWords}>
          Carregar mais
        </Anchor>
      </Center>
    </div>
  );
}
