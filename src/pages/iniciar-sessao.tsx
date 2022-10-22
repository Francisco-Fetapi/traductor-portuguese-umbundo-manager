import { Box, Center } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { SignInForm } from "../components/forms/SignInForm";
import nookies from "nookies";
import { FooterSignin } from "../components/Footers";

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Gestor do tradutor Português - Umbundo - Diga quem és</title>
      </Head>
      <Center sx={{ minHeight: "100vh" }}>
        <Box style={{ width: "90%", maxWidth: 500 }}>
          <SignInForm />
        </Box>
      </Center>
      <FooterSignin />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  // if (cookies.name) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       statusCode: undefined,
  //     },
  //     props: {},
  //   };
  // }

  return {
    props: {},
  };
};
