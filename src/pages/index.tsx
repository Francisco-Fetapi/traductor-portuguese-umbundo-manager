import { Box, Center } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import nookies from "nookies";
import { AddNewWordForm } from "../components/forms/AddNewWordForm";
import { NavigationProgress } from "@mantine/nprogress";
import { Footer } from "../components/Footer";
import { redirectNoLogin } from "../helpers/redirectNoLogin";

export default function IndexPage() {
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

export const getServerSideProps: GetServerSideProps = redirectNoLogin;
