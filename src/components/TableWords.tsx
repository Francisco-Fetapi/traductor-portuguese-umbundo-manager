import {
  createStyles,
  Table,
  Anchor,
  ScrollArea,
  ActionIcon,
} from "@mantine/core";
import useDatabase from "../hooks/useDatabase";
import TableWordRow from "./TableWordRow";

const useStyles = createStyles((theme) => ({
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `3px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
  forTd: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 180,
  },
}));

export function TableWords() {
  const { classes, theme } = useStyles();
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
