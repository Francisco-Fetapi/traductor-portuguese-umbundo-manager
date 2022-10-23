import {
  createStyles,
  Text,
  Container,
  ActionIcon,
  Group,
  Center,
  useMantineColorScheme,
  useMantineTheme,
  Tooltip,
} from "@mantine/core";

import { IconDownload, IconSun, IconMoonStars } from "@tabler/icons";
import LinkTradutorUmbundo from "./LinkTradutorUmbundo";
import { openConfirmModal } from "@mantine/modals";
import { useRef } from "react";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 20,
    paddingTop: theme.spacing.xl * 1,
    paddingBottom: theme.spacing.xl * 1,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  logo: {
    maxWidth: 200,

    [theme.fn.smallerThan("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },

  description: {
    marginTop: 5,

    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
      textAlign: "center",
    },
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  groups: {
    display: "flex",
    flexWrap: "wrap",

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  wrapper: {
    width: 160,
  },

  link: {
    display: "block",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: 3,
    paddingBottom: 3,

    "&:hover": {
      textDecoration: "underline",
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xs / 2,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  afterFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  social: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
    },
  },
}));

export function FooterSignin() {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const linkDownloadRef = useRef<HTMLAnchorElement | null>(null);

  const openModalDowloadPDF = () =>
    openConfirmModal({
      title: "Baixar Dicionário Português - Umbundo em PDF",
      children: (
        <Text size="sm">
          Você está prestes a baixar o Dicionário Português - Umbundo, clica em
          <b> confirmar</b> para começar o download.
          <br />
          <br />
          O Dicionário servirá de referencia para preencher o formulário.
          <br />
          <br />
          <b>
            NOTA: O PDF tem um tamanho de <i>16MB</i>{" "}
          </b>
        </Text>
      ),
      labels: { confirm: "Confirmar", cancel: "Cancelar" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        console.log("Confirmed");
        linkDownloadRef.current?.click();
      },
    });

  return (
    <footer className={classes.footer}>
      <Center
        sx={{
          maxWidth: 600,
          margin: "0 auto",
        }}
      >
        <a
          href="https://github.com/Francisco-Fetapi/traductor-portuguese-umbundo-manager/raw/main/public/DICIONARIO%20PORTUGUES%20-%20UMBUNDO.pdf"
          ref={linkDownloadRef}
          style={{ display: "none" }}
          target="__blank"
        />
        <Text color="dimmed" size="sm" align="center">
          O <LinkTradutorUmbundo /> é um aplicativo utilizado para traduzir um
          texto entre os dois idiomas. Este é um sistema que provê os recursos
          para que qualquer usuario autorizado possa adicionar palavras ao{" "}
          <b>Tradutor</b> em questão.
        </Text>
      </Center>

      <Container className={classes.afterFooter}>
        <Text color="dimmed" size="sm">
          © 2022 Todos os direitos reservados.
        </Text>
        <Group spacing={12} className={classes.social} position="right" noWrap>
          <Tooltip label="Alterar tema">
            <ActionIcon
              onClick={() => toggleColorScheme()}
              size="lg"
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.yellow[4]
                    : theme.colors.blue[6],
              })}
            >
              {colorScheme === "dark" ? (
                <IconSun size={20} />
              ) : (
                <IconMoonStars size={20} />
              )}
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Baixar PDF Dicionário de Português - Umbundo">
            <ActionIcon size="lg" onClick={openModalDowloadPDF}>
              <IconDownload size={20} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Container>
    </footer>
  );
}
