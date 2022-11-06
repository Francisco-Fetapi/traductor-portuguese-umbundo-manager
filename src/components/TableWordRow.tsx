import { ActionIcon, createStyles } from "@mantine/core";
import React from "react";
import { FromPTtoUM, IWord } from "../database/IWord";

const useStyles = createStyles((theme) => ({
  forTd: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 180,
  },
}));

interface TableTableRowProps {
  position: number;
  word: IWord<FromPTtoUM[]>;
}

export default function TableWordRow({ position, word }: TableTableRowProps) {
  const { classes } = useStyles();
  return (
    <tr key={word.pt}>
      <td>{position + 1}</td>
      <td className={classes.forTd}>{word.pt}</td>
      <td className={classes.forTd}>{word.um}</td>
      <td>
        <ActionIcon>
          <h4>. . .</h4>
        </ActionIcon>
      </td>
    </tr>
  );
}
