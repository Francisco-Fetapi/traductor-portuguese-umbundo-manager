import { ActionIcon, createStyles } from "@mantine/core";
import React from "react";
import { FromPTtoUM, IWord } from "../database/IWord";

import { Menu, Button, Text } from '@mantine/core';
import { IconTrash, IconInfoCircle, IconPencil } from '@tabler/icons';

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
        <MenuRow>
          <ActionIcon>
            <h4>. . .</h4>
          </ActionIcon>
        </MenuRow>
      </td>
    </tr>
  );
}

interface MenuRowProps{
  children:React.ReactNode;
}

function MenuRow({children}:MenuRowProps) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        {children}
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Gerais</Menu.Label>
        <Menu.Item icon={<IconInfoCircle size={14} />}>Detalhes</Menu.Item>
        <Menu.Item icon={<IconPencil size={14} />}>Editar</Menu.Item>

        <Menu.Divider />
        
        <Menu.Item color="red" icon={<IconTrash size={14} />}>Apagar</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}