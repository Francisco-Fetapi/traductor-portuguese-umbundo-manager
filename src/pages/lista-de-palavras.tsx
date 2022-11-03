import { Box, Center, Text } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { Footer } from "../components/Footer";
import { TableWords } from "../components/TableWords";
import { redirectNoLogin } from "../helpers/redirectNoLogin";

export default function WordsListPage() {
  return (
    <>
      <Head>
        <title>Lista de palavras</title>
      </Head>
      <NavigationProgress />
      <Center sx={{ minHeight: "100vh" }}>
        <div>
          <Text align="center" size="xl">
            Lista de Palavras
          </Text>

          <Box mt={20}>
            <TableWords />
          </Box>
        </div>
      </Center>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = redirectNoLogin;
