import {
  Button,
  TextInput,
  Center,
  Box,
  Group,
  Text,
  Accordion,
} from "@mantine/core";
import { IConversation } from "../database/IConversation";
import useDatabase from "../hooks/useDatabase";
import React from "react";
import { openModal } from "@mantine/modals";
import useModalOverlay from "../hooks/useModalOverlay";

interface AccordionLabelProps extends IConversation {}

function AccordionLabel({ topic, description }: AccordionLabelProps) {
  return (
    <Group noWrap>
      {/* <Avatar src={image} radius="xl" size="lg" /> */}
      <div>
        <Text>{topic}</Text>
        <Text size="sm" color="dimmed" weight={400}>
          {description}
        </Text>
      </div>
    </Group>
  );
}

export default function TopicList() {
  const { conversations } = useDatabase();
  const modalProps = useModalOverlay(true);
  const items = conversations?.map((conversation) => (
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
      </Accordion.Panel>
    </Accordion.Item>
  ));

  function handleOpenFormConversation() {
    openModal({
      title: "Novo Tópico",
      children: <FormConversation />,
      ...modalProps,
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

function FormConversation({ conversation }: FormConversationProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        rowGap: 12,
      }}
    >
      <TextInput label="Titulo" />
      <TextInput label="Descrição" />
    </div>
  );
}
