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
  Radio,
  Container,
  Anchor,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { IWord } from "../../database/IWord";
import { IWordClasses } from "../../database/IWordClasses";
import wordClasses from "../../database/wordClasses.json";

const courses = ["Curso1", "Curso2", "Curso3", "Curso4", "Curso5"];
const defaultClass = Object.keys(wordClasses)[0] as keyof IWordClasses;

export function AddNewWordForm() {
  const form = useForm({
    initialValues: {
      pt: "",
      um: "",
      class: defaultClass,
      examples: "",
    },
    validate: {},
  });
  const router = useRouter();
  const handleSubmit = (values: typeof form.values) => {
    console.log(values);

    router.push("/criar-conta/foto-de-perfil");
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
            >
              {wordClasses[form.values.class]}
            </Text>
          </Box>

          <Box>
            <Textarea
              minRows={8}
              label="Exemplos"
              placeholder={`Este campo não é obrigatório.\n\nCada exemplo deve estar no formato:\nFrase em portugues - Frase em Umbundo\n\nSepare os exemplos por quebra de linha. 
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
        Contribua com o projeto{" "}
        <Anchor<"a">
          size="sm"
          target="__blank"
          href="https://portuguese-umbundo-dictionary.vercel.app/"
        >
          Tradutor Umbundo - Português
        </Anchor>{" "}
        adicionando mais palavras a base de dados.
      </Text>
    </Box>
  );
}
