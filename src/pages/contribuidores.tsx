import { Center } from "@mantine/core";
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
      <Center sx={{ minHeight: "100vh" }}>
        <h1>Contribuidores</h1>
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
