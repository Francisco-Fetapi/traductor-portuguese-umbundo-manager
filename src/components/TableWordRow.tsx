import {
  Highlight,
  Group,
  Anchor,
  ActionIcon,
  createStyles,
  Box,
} from "@mantine/core";
import React from "react";
import { FromPTtoUM, IWord } from "../database/IWord";

import { Menu, Button, Text } from "@mantine/core";
import { IconTrash, IconInfoCircle, IconPencil } from "@tabler/icons";
import { openConfirmModal, openModal } from "@mantine/modals";
import useModalOverlay from "../hooks/useModalOverlay";
import FormWordFields from "./forms/FormWordFields";
import sleep from "../helpers/sleep";
import { parseCookies } from "nookies";
import getWordClass from "../helpers/getWordClass";
import dateDistance from "../helpers/dateDistance";

function stringifyExamples(examples: FromPTtoUM[]): string {
  const parsed = examples.map((example) => {
    return `${example.pt} - ${example.um}`;
  });
  return parsed.join("\n");
}

const Word = {
  EditForm({ word }: HasWord) {
    return (
      <Box>
        <FormWordFields
          formTitle="EDITAR PALAVRA"
          initialValues={{
            ...word,
            examples: stringifyExamples(word.examples),
          }}
          onSubmit={async (values, { formatedExamples, form }) => {
            console.log(values);
            await sleep(3);
          }}
        />
      </Box>
    );
  },
  ViewDetails({ word }: HasWord) {
    return (
      <Box>
        <Group
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Text size="md">{word.pt}</Text>
          <Text size="xs" color="dimmed">
            {getWordClass(word.class)}
          </Text>
        </Group>
        <Text size="xs" color="dimmed">
          {word.um}
        </Text>
        <br />
        <Text size="xs" color="dimmed">
          Adicionado <b>{dateDistance(new Date(word.date))}</b> por{" "}
          <Anchor>{word.author}</Anchor>
        </Text>
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
  search: string;
}

export default function TableWordRow({
  position,
  word,
  search,
}: TableTableRowProps) {
  const { classes } = useStyles();
  const modalDefaultOptions = useModalOverlay();
  const modalDefaultOptions2 = useModalOverlay(true);
  const cookies = parseCookies();
  const wasAddedByMe = cookies.name === word.author;

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
      // title: "Editar",
      children: <Word.EditForm word={word} />,
      ...modalDefaultOptions2,
    });
  }

  return (
    <tr key={word.pt}>
      <td>{position + 1}</td>
      <td className={classes.forTd}>
        <Highlight highlight={search}>{word.pt}</Highlight>
      </td>
      <td className={classes.forTd}>
        <Highlight highlight={search}>{word.um}</Highlight>
      </td>
      {wasAddedByMe ? (
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
      ) : (
        <td>
          <ActionIcon onClick={openModalMoreDetails}>
            <IconInfoCircle />
          </ActionIcon>
        </td>
      )}
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
