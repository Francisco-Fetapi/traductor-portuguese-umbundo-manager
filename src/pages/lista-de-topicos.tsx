import { Center } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { Footer } from "../components/Footer";
import TopicList from "../components/TopicList";
import { redirectNoLogin } from "../helpers/redirectNoLogin";

export default function TopcicListPage() {
  return (
    <>
      <Head>
        <title>Lista de Tópicos</title>
      </Head>
      <NavigationProgress />
      <Center>
        <h1>Lista de Topicos</h1>
      </Center>
      <Center sx={{ padding: "10px 10px" }}>
        <TopicList />
      </Center>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = redirectNoLogin;
