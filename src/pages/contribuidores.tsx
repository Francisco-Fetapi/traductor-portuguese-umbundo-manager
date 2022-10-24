import { Center, Text } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import nookies from "nookies";
import { Footer } from "../components/Footer";

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Gestor do tradutor Português - Umbundo - Contribuidores</title>
      </Head>
      <Center sx={{ minHeight: "80vh" }}>
        <div>
          <Text align="center" size="xl">
            Página de Contribuidores
          </Text>
          <Text size="xs" align="center" color="dimmed">
            Página em Desenvolvimento.
          </Text>
          <Text size="xs" align="center" color="dimmed">
            Essa página se destinará a exibir uma tabela que fornecerá
          </Text>
        </div>
      </Center>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  if (!cookies.name) {
    return {
      redirect: {
        destination: "/iniciar-sessao",
        statusCode: undefined,
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
