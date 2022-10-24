import {
  TextInput,
  Textarea,
  Paper,
  Title,
  Text,
  Button,
  Box,
  Center,
  Stack,
  Select,
  Anchor,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { IWordClasses } from "../../database/IWordClasses";
import wordClasses from "../../database/wordClasses.json";
import axios from "axios";
import {
  setNavigationProgress,
  startNavigationProgress,
  resetNavigationProgress,
} from "@mantine/nprogress";
import { showNotification } from "@mantine/notifications";
import { useScrollIntoView } from "@mantine/hooks";
import { IResponseProps } from "../../pages/api/add-new-word";
import LinkTradutorUmbundo from "../LinkTradutorUmbundo";
import { useState, useRef } from "react";

const defaultClass = Object.keys(wordClasses)[0] as keyof IWordClasses;

export function AddNewWordForm() {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 5,
  });
  // const [formatedExamples, setFormatedExamples] = useState([]);
  const formatedExamples = useRef<{ pt: string; um: string }[]>([]);

  const form = useForm({
    initialValues: {
      pt: "",
      um: "",
      class: defaultClass,
      examples: "",
    },
    validate: {
      examples(examples) {
        if (examples.trim().length === 0) {
          return null;
        }
        const msgError = "O formato dos exemplos está incorreto.";
        let listExamples = examples.split("\n");
        listExamples = listExamples.filter((example) => {
          return /\w+\s+-\s+\w\s*/.test(example);
        });

        if (listExamples.length === 0) {
          return msgError;
        }
        const listExamplesPtUm = listExamples.map((example) => {
          const [pt, um] = example.split(/\s+-\s+/);
          return { pt, um };
        });

        let allRight = listExamplesPtUm.every((example) => {
          return example.pt && example.um;
        });
        if (!allRight) {
          return msgError;
        }

        formatedExamples.current = listExamplesPtUm;
      },
    },
  });

  const handleSubmit = async (formValues: typeof form.values) => {
    const values = {
      ...formValues,
      formatedExamples: formatedExamples.current,
    };
    resetNavigationProgress();
    startNavigationProgress();
    let { data } = await axios.post<IResponseProps>(
      "/api/add-new-word",
      values
    );
    setNavigationProgress(100);

    console.log(data);
    if (data.status === "success") {
      showNotification({
        title: "Cadastro feito com sucesso.",
        message: (
          <>
            Agora você pode visitar o &nbsp;
            <LinkTradutorUmbundo /> e conferir por você mesmo a palavra
            cadastrada.
          </>
        ),
        color: "green",
      });

      form.reset();
      formatedExamples.current = [];
    } else {
      showNotification({
        title: "Erro ao cadastrar.",
        message: data.message,
        color: "red",
      });
      console.log(data.message);
    }
    scrollIntoView();
  };

  return (
    <Stack my={50}>
      <FormHeader />

      <Paper
        component="form"
        autoComplete="off"
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <div ref={targetRef} />
        <Stack style={{ flexDirection: "column" }}>
          <Title
            align="center"
            sx={() => ({
              fontWeight: 600,
              fontSize: 25,
            })}
            mb="md"
          >
            CADASTRAR PALAVRA
          </Title>
          <TextInput
            label="Palavra em português"
            placeholder="Apenas uma palavra"
            required
            {...form.getInputProps("pt")}
          />
          <TextInput
            label="Tradução para umbundo"
            placeholder="Separe-as por virgulas se necessário"
            {...form.getInputProps("um")}
            required
          />
          <Select
            style={{ zIndex: 2 }}
            data={Object.keys(wordClasses)}
            {...form.getInputProps("class")}
            // placeholder="Escolha uma "
            label="Selecione a classe desta palavra"
            required
          />
          <Box px={4} mt={-10}>
            <Text
              sx={{
                textTransform: "capitalize",
              }}
              size="sm"
              weight={300}
            >
              {wordClasses[form.values.class]}
            </Text>
          </Box>

          <Box>
            <Textarea
              minRows={8}
              label="Exemplos"
              placeholder={`Este campo não é obrigatório.\n\nCada exemplo deve estar no formato:\nFrase em portugues - Frase em Umbundo\nFrase em portugues - Frase em Umbundo\n\nNOTA: Os exemplos devem ser separados por quebras de linha. 
              `}
              {...form.getInputProps("examples")}
            />
          </Box>

          <Center>
            <Button type="submit">Concluir</Button>
          </Center>
        </Stack>
      </Paper>
    </Stack>
  );
}

function FormHeader() {
  return (
    <Box>
      <Title
        align="center"
        sx={() => ({
          fontWeight: 900,
        })}
      >
        Tradutor Umbundo
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Contribua com o projeto <LinkTradutorUmbundo /> adicionando mais
        palavras na sua base de dados.
      </Text>
    </Box>
  );
}
