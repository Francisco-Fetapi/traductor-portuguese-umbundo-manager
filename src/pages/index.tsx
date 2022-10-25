import { Box, Center } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import nookies from "nookies";
import { AddNewWordForm } from "../components/forms/AddNewWordForm";

import { NavigationProgress } from "@mantine/nprogress";
// import { useCollection } from "react-firebase-hooks/firestore";
import { Footer } from "../components/Footer";
// import { wordsCollection } from "../api-firebase";

export default function IndexPage() {
  // const [words, wordsLoading, wordsError] = useCollection(wordsCollection);
  // if (!wordsLoading && words) {
  //   words.docs.map((doc) => console.log(doc.data()));
  // }
  return (
    <>
      <Head>
        <title>Gestor do tradutor Português - Umbundo</title>
      </Head>
      <NavigationProgress />
      <Center sx={{ minHeight: "100vh" }}>
        <AddNewWordForm />
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
