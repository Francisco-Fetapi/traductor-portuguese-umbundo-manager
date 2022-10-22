import { Box, Center } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import nookies from "nookies";

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Gestor do tradutor Português - Umbundo</title>
      </Head>
      <Center sx={{ minHeight: "100vh" }}>
        <Box style={{ width: "90%", maxWidth: 500 }}>Ola Mundo.</Box>
      </Center>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  if (!cookies.name) {
    console.log("Nao tem sessao");
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
