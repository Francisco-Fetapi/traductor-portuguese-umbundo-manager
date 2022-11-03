import { Center } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";
import Head from "next/head";
import React from "react";
import { Footer } from "../components/Footer";

export default function WordsListPage() {
  return (
    <>
      <Head>
        <title>Lista de palavras</title>
      </Head>
      <NavigationProgress />
      <Center sx={{ minHeight: "100vh" }}>
        <h1>Ola Mundo</h1>
      </Center>
      <Footer />
    </>
  );
}
