import {
  createStyles,
  Text,
  Container,
  ActionIcon,
  Group,
  Center,
  Switch,
  useMantineColorScheme,
  useMantineTheme,
  Tooltip,
} from "@mantine/core";

import { MantineLogo } from "@mantine/ds";
import { IconDownload, IconSun, IconMoonStars } from "@tabler/icons";
import LinkTradutorUmbundo from "./LinkTradutorUmbundo";

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

  return (
    <footer className={classes.footer}>
      <Center
        sx={{
          maxWidth: 600,
          margin: "0 auto",
        }}
      >
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
            <ActionIcon size="lg">
              <IconDownload size={20} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Container>
    </footer>
  );
}
