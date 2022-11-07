import { ActionIcon, createStyles, Box } from "@mantine/core";
import React from "react";
import { FromPTtoUM, IWord } from "../database/IWord";

import { Menu, Button, Text } from "@mantine/core";
import { IconTrash, IconInfoCircle, IconPencil } from "@tabler/icons";
import { openConfirmModal, openModal } from "@mantine/modals";
import useModalOverlay from "../hooks/useModalOverlay";

const Word = {
  EditForm({ word }: HasWord) {
    return (
      <Box>
        <Text size="sm">Formulario para editar a palavra</Text>
      </Box>
    );
  },
  ViewDetails({ word }: HasWord) {
    return (
      <Box>
        <Text size="sm">Mais detalhes</Text>
      </Box>
    );
  },
};

const useStyles = createStyles((theme) => ({
  forTd: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 180,
  },
}));

interface HasWord {
  word: IWord<FromPTtoUM[]>;
}

interface TableTableRowProps extends HasWord {
  position: number;
}

export default function TableWordRow({ position, word }: TableTableRowProps) {
  const { classes } = useStyles();
  const modalDefaultOptions = useModalOverlay();

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
      ...modalDefaultOptions,
    });
  }
  function openModalMoreDetails() {
    openModal({
      title: "Detalhes",
      children: <Word.ViewDetails word={word} />,
      ...modalDefaultOptions,
    });
  }
  function openEditForm() {
    openModal({
      title: "Editar",
      children: <Word.EditForm word={word} />,
      ...modalDefaultOptions,
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
