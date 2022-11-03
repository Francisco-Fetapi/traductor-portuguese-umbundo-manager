import { Center } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { Footer } from "../components/Footer";
import { redirectNoLogin } from "../helpers/redirectNoLogin";

export default function NewTopciPage() {
  return (
    <>
      <Head>
        <title>Novo Tópico</title>
      </Head>
      <NavigationProgress />
      <Center sx={{ minHeight: "100vh" }}>
        <h1>Ola Mundo</h1>
      </Center>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = redirectNoLogin;
