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
} from "@mantine/core";

import { useForm, UseFormReturnType } from "@mantine/form";
import { IWordClasses } from "../../database/IWordClasses";
import wordClasses from "../../database/wordClasses.json";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { useScrollIntoView } from "@mantine/hooks";
import LinkTradutorUmbundo from "../LinkTradutorUmbundo";
import { useRef, useState } from "react";
import { setWord } from "../../api-firebase";
import { FromPTtoUM, IWord } from "../../database/IWord";
import { parseCookies } from "nookies";

interface FormValues {
  pt: string;
  um: string;
  class: keyof IWordClasses;
  examples: string;
}

export interface FormProps {
  initialValues: FormValues;
  onSubmit: (
    values: IWord<FromPTtoUM[]>,
    options: {
      formatedExamples: React.MutableRefObject<FromPTtoUM[]>;
      form: UseFormReturnType<FormValues>;
    }
  ) => Promise<void>;
  targetRef?: React.MutableRefObject<HTMLDivElement>;
  formTitle: string;
  withPaperProps?: boolean;
}

export default function FormWordFields({
  initialValues,
  formTitle,
  onSubmit,
  targetRef,
  withPaperProps,
}: FormProps) {
  const formatedExamples = useRef<FromPTtoUM[]>([]);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues,
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
    const cookies = parseCookies();
    const values = {
      pt: formValues.pt.toLowerCase().trim(),
      um: formValues.um.toLowerCase().trim(),
      class: formValues.class,
      examples: formatedExamples.current,
      author: cookies.name,
      date: new Date().toString(),
    };

    setLoading(true);

    await onSubmit(values, { formatedExamples, form });

    setLoading(false);
  };
  const paperProps: any =
    withPaperProps == true
      ? {
          withBorder: true,
          shadow: "md",
          p: 30,
          mt: 30,
          radius: "md",
        }
      : {};
  return (
    <Paper
      component="form"
      autoComplete="off"
      {...paperProps}
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
          {formTitle}
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
          <Button type="submit" loading={loading}>
            Concluir
          </Button>
        </Center>
        <br />
      </Stack>
    </Paper>
  );
}
