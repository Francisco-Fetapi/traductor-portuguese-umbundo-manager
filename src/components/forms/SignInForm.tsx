import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Group,
  Button,
  Box,
  Center,
  Stack,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import LinkTradutorUmbundo from "../LinkTradutorUmbundo";

export function SignInForm() {
  const form = useForm({
    initialValues: {
      name: "",
      token: "",
    },
    validate: {
      name($value) {
        const value = $value.trim();
        if (value.length < 10) return "Nome demasiado curto.";
        if (value.split(" ").length > 2)
          return "Insira apenas o primeiro e último nome.";
      },
      token(token) {
        if (token !== "bad-b") {
          return "Token incorreto. Você não pode acessar o sistema sem o token correto.";
        }
      },
    },
  });
  const router = useRouter();
  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
    setCookie(null, "name", values.name, {
      maxAge: 12 * 30 * 24 * 60 * 60,
      path: "/",
    });
    router.push("/");
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
            DIGA QUEM ÉS
          </Title>

          <TextInput
            label="Nome"
            placeholder="Primeiro e último nome"
            required
            {...form.getInputProps("name")}
          />
          <PasswordInput
            label="Chave de acesso"
            placeholder="Confirmar permissão de acesso ao sistema"
            required
            {...form.getInputProps("token")}
          />
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
        Ajude-nos a Ajudar Angola
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Sistema desenvolvido para disponibilizar uma interface gráfica para
        adicionar palavras ao <LinkTradutorUmbundo />
      </Text>
    </Box>
  );
}
