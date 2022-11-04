import { createStyles, Table, Anchor, ScrollArea } from "@mantine/core";
import useDatabase from "../hooks/useDatabase";

const useStyles = createStyles((theme) => ({
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `3px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

export function TableWords() {
  const { classes, theme } = useStyles();
  const { words, orderByDate } = useDatabase();

  const rows = orderByDate(words)?.map((word, position) => {
    return (
      <tr key={word.author}>
        <td>{position + 1}</td>
        <td>{word.pt}</td>
        <td>{word.um}</td>
        <td>
          <Anchor<"a"> size="sm" onClick={(event) => event.preventDefault()}>
            {word.author}
          </Anchor>
        </td>

        {/* <td>
          <abbr title={getClass(word.class)}>{word.class}</abbr>
        </td>
        <td>{new Date(word.date).toLocaleDateString()}</td> */}
      </tr>
    );
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
            <th>Autor</th>
            {/* <th>Classe</th>
            <th>Adicionada</th> */}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
