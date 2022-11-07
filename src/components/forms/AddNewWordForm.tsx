import { Title, Text, Box, Stack } from "@mantine/core";

import { IWordClasses } from "../../database/IWordClasses";
import wordClasses from "../../database/wordClasses.json";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { useScrollIntoView } from "@mantine/hooks";
import LinkTradutorUmbundo from "../LinkTradutorUmbundo";

import { setWord } from "../../api-firebase";
import FormWordFields, { FormProps } from "./FormWordFields";

const defaultClass = Object.keys(wordClasses)[0] as keyof IWordClasses;

axios.defaults["headers"] = { "Access-Control-Allow-Origin": "*" };

export function AddNewWordForm() {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 5,
  });
  const initialValues = {
    pt: "",
    um: "",
    class: defaultClass,
    examples: "",
  };

  const onSubmit: FormProps["onSubmit"] = async (
    values,
    { formatedExamples, form }
  ) => {
    try {
      await setWord(values);
      // await sleep(3);

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
    } catch (e: any) {
      showNotification({
        title: "Erro ao cadastrar.",
        message: e.message,
        color: "red",
      });
      console.log(e.message);
    }
    scrollIntoView();
  };

  return (
    <Stack my={50}>
      <FormHeader />

      <FormWordFields
        formTitle="CADASTRAR PALAVRA"
        initialValues={initialValues}
        onSubmit={onSubmit}
        targetRef={targetRef}
        withPaperProps
      />
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
