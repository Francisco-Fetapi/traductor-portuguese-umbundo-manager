import { Box, Center, Text } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import nookies from "nookies";
import { Footer } from "../components/Footer";
import { TableContribuitions } from "../components/TableContrubuitions";
import DatabaseProvider from "../context/DatabaseProvider";

export default function Contribuidores() {
  return (
    <>
      <Head>
        <title>Gestor do tradutor Português - Umbundo - Contribuidores</title>
      </Head>
      <DatabaseProvider>
        <Center sx={{ minHeight: "80vh" }}>
          <div>
            <Text align="center" size="xl">
              Contribuidores
            </Text>

            <Box mt={20}>
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
            </Box>

            <Box mt={20}>
              <Text size="sm" align="center" color="dimmed">
                Total de palavras: <b>12</b>
              </Text>
            </Box>
          </div>
        </Center>
      </DatabaseProvider>
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
