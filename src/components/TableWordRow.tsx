import { ActionIcon, createStyles } from "@mantine/core";
import React from "react";
import { FromPTtoUM, IWord } from "../database/IWord";

import { Menu, Button, Text } from "@mantine/core";
import { IconTrash, IconInfoCircle, IconPencil } from "@tabler/icons";
import { openConfirmModal, openModal } from "@mantine/modals";

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

// overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
// overlayOpacity={0.55}
// overlayBlur={3}

export default function TableWordRow({ position, word }: TableTableRowProps) {
  const { classes } = useStyles();

  function openModalDelete() {
    openConfirmModal({
      title: (
        <>
          Apagar <b>&quot;{word.pt.trim()}&quot;</b>
        </>
      ),
      children: (
        <Text size="sm">
          Você tem certeza que pretende apagar esta palavra?
        </Text>
      ),
      labels: { confirm: "Confirmar", cancel: "Cancelar" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        console.log("Confirmed");
      },
    });
  }
  function openModalMoreDetails() {
    openModal({
      title: "Detalhes",
      children: <Text size="sm">Mostrar mais detalhes</Text>,
    });
  }
  function openEditForm() {
    openModal({
      title: "Editar",
      children: <Text size="sm">Formulario para editar a palavra</Text>,
    });
  }

  return (
    <tr key={word.pt}>
      <td>{position + 1}</td>
      <td className={classes.forTd}>{word.pt}</td>
      <td className={classes.forTd}>{word.um}</td>
      <td>
        <MenuRow
          handleDelete={openModalDelete}
          handleDetails={openModalMoreDetails}
          handleEdit={openEditForm}
        >
          <ActionIcon>
            <h4>. . .</h4>
          </ActionIcon>
        </MenuRow>
      </td>
    </tr>
  );
}

interface MenuRowProps {
  children: React.ReactNode;
  handleDelete: () => void;
  handleDetails: () => void;
  handleEdit: () => void;
}

function MenuRow({
  children,
  handleDelete,
  handleDetails,
  handleEdit,
}: MenuRowProps) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>{children}</Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Gerais</Menu.Label>
        <Menu.Item onClick={handleDetails} icon={<IconInfoCircle size={14} />}>
          Detalhes
        </Menu.Item>
        <Menu.Item onClick={handleEdit} icon={<IconPencil size={14} />}>
          Editar
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          onClick={handleDelete}
          color="red"
          icon={<IconTrash size={14} />}
        >
          Apagar
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
