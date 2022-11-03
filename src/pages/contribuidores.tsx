import { Center, Text } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import nookies from "nookies";
import { Footer } from "../components/Footer";
import { TableContribuitions } from "../components/TableContrubuitions";

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

          <TableContribuitions
            data={[
              {
                author: "Francisco Fetapi",
                lastModified: "12/02/2022",
                numWords: 1,
                reviews: { negative: 25, positive: 75 },
              },
              {
                author: "Felipe Carlos",
                lastModified: "12/02/2022",
                numWords: 12,
                reviews: { negative: 60, positive: 40 },
              },
              {
                author: "Micael Andrande",
                lastModified: "12/02/2022",
                numWords: 12,
                reviews: { negative: 60, positive: 40 },
              },
              {
                author: "Maria Rangel",
                lastModified: "12/02/2022",
                numWords: 12,
                reviews: { negative: 60, positive: 40 },
              },
            ]}
          />
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
