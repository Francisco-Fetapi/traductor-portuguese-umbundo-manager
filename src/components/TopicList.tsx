import {
  Button,
  Tooltip,
  ActionIcon,
  TextInput,
  Center,
  Box,
  Group,
  Text,
  Accordion,
} from "@mantine/core";
import { IConversation } from "../database/IConversation";
import useDatabase from "../hooks/useDatabase";
import React, { useState, useRef } from "react";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import useModalOverlay from "../hooks/useModalOverlay";
import { IconCheck, IconEdit, IconTrash } from "@tabler/icons";
import { useInputState } from "@mantine/hooks";
import { parseCookies } from "nookies";
import { deleteConversation, setConversation } from "../api-firebase";
import { showNotification } from "@mantine/notifications";

interface AccordionLabelProps extends IConversation {}

function AccordionLabel({ topic, description }: AccordionLabelProps) {
  return (
    <Group noWrap>
      <div>
        <Text>{topic}</Text>
        <Text size="sm" color="dimmed" weight={400}>
          {description}
        </Text>
      </div>
    </Group>
  );
}

function handleDeleteConversation(conversation: IConversation) {
  openConfirmModal({
    title: (
      <>
        Apagar <b>&quot;{conversation.topic.trim()}&quot;</b>
      </>
    ),
    children: (
      <Text size="sm">
        Você tem certeza que pretende apagar este tópico inteiro?
      </Text>
    ),
    labels: { confirm: "Confirmar", cancel: "Cancelar" },
    onCancel: () => console.log("Cancel"),
    onConfirm: async () => {
      try {
        await deleteConversation(conversation.id!);
        showNotification({
          title: "Tópico apagado",
          message: (
            <>
              O tópico <b>&quot;{conversation.topic.trim()}&quot;</b> foi
              apagado com sucesso!
            </>
          ),
          color: "green",
        });
      } catch (e: any) {
        showNotification({
          title: "Erro ao apagar",
          message: e.message,
          color: "red",
        });
      }
    },
    // ...modalDefaultOptions,
  });
}

export default function TopicList() {
  const { conversations } = useDatabase();
  const modalProps = useModalOverlay(true);
  const cookies = parseCookies();

  const items = conversations?.map((conversation) => {
    const isMine = cookies.name === conversation.author;

    return (
      <Accordion.Item value={conversation.topic} key={conversation.topic}>
        <Accordion.Control>
          <AccordionLabel {...conversation} />
        </Accordion.Control>
        <Accordion.Panel>
          {conversation.phrases.map((phrase, key) => (
            <div
              style={{
                marginBottom: 10,
              }}
              key={phrase.pt}
            >
              <Text size="sm">
                {key + 1}. {phrase.pt}
              </Text>
              <Text size="xs" color="dimmed">
                {phrase.um}
              </Text>
            </div>
          ))}
          {isMine && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <ActionIcon
                onClick={() => handleOpenFormConversationEdit(conversation)}
              >
                <IconEdit size={16} />
              </ActionIcon>
              <ActionIcon
                onClick={() => handleDeleteConversation(conversation)}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </div>
          )}
        </Accordion.Panel>
      </Accordion.Item>
    );
  });

  function handleOpenFormConversation() {
    openModal({
      title: "Novo Tópico",
      children: <FormConversation />,
      ...modalProps,
      styles(theme, params) {
        return {
          body: {
            minHeight: "80vh",
          },
        };
      },
    });
  }
  function handleOpenFormConversationEdit(conversation: IConversation) {
    openModal({
      title: "Editar Tópico",
      children: <FormConversation conversation={conversation} />,
      ...modalProps,
      styles(theme, params) {
        return {
          body: {
            minHeight: "80vh",
          },
        };
      },
    });
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
      <Accordion chevronPosition="right" variant="contained">
        {items}
      </Accordion>
      <br />
      <Center>
        <Button onClick={handleOpenFormConversation}>Novo Tópico</Button>
      </Center>
    </Box>
  );
}

interface FormConversationProps {
  conversation?: IConversation;
}
interface Phrase {
  pt: string;
  um: string;
}

function FormConversation({ conversation }: FormConversationProps) {
  const [title, handleTitle] = useInputState(conversation?.topic || "");
  const [description, handleDescription] = useInputState(
    conversation?.description || ""
  );
  const [forms, setForms] = useState<Phrase[]>(
    conversation?.phrases || [
      {
        pt: "",
        um: "",
      },
    ]
  );
  const cookies = parseCookies();
  function AddMoreFields() {
    setForms([...forms, { pt: "", um: "" }]);
    console.log(forms);
  }
  const rightSection = (
    <Tooltip label="Concluido" position="top-end" withArrow>
      <ActionIcon onClick={AddMoreFields}>
        <IconCheck size={16} />
      </ActionIcon>
    </Tooltip>
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    pos: number,
    prop: keyof Phrase
  ) {
    setForms((prev) =>
      prev.map((form, key) => {
        if (key === pos) {
          form[prop] = e.target.value;
        }
        return form;
      })
    );
  }

  async function saveTopic() {
    const slug = title.replace(/\s/g, "-").toLowerCase(); //uui, or another
    const values: IConversation = {
      topic: title,
      description,
      slug,
      phrases: forms,
      author: cookies.name,
      date: new Date().toString(),
    };

    if (conversation) {
      values.id = conversation.id;
    }

    try {
      await setConversation(values);
      closeAllModals();
    } catch (e: any) {
      showNotification({
        title: "Erro ao adicionar Tópico",
        message: "Houve um erro ao tentar adicionar um novo tópico.",
      });
    }
    console.log(values);
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        rowGap: 12,
      }}
    >
      <TextInput label="Titulo" onChange={handleTitle} value={title} />
      <TextInput
        label="Descrição"
        onChange={handleDescription}
        value={description}
      />
      <br />
      <Text size="lg">Frases</Text>
      {forms.map((form, key) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (key === forms.length - 1) {
              AddMoreFields();
            }
          }}
          key={key}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
            }}
          >
            <TextInput
              value={form.pt}
              onChange={(e) => handleChange(e, key, "pt")}
              label="Português"
            />
            <TextInput
              value={form.um}
              onChange={(e) => handleChange(e, key, "um")}
              label="Umbundo"
              rightSection={
                key === forms.length - 1 && form.pt && form.um
                  ? rightSection
                  : undefined
              }
            />
          </div>
        </form>
      ))}
      <br />
      <Center>
        <Button onClick={saveTopic}>Concluir</Button>
      </Center>
    </div>
  );
}
