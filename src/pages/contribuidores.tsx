import { Anchor, Box, Center, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import nookies from "nookies";
import { useMemo } from "react";
import BackLinkButton from "../components/BackLinkButton";
import { Footer } from "../components/Footer";
import {
  TableContribuitions,
  TableContribuitionsProps,
} from "../components/TableContrubuitions";
import { redirectNoLogin } from "../helpers/redirectNoLogin";
import useDatabase from "../hooks/useDatabase";

export default function Contribuidores() {
  const {
    words,
    getAuthors,
    getAuthorPercentByWordsAdded,
    getWordsAddedByAuthor,
    getLastUpdateByAuthor,
  } = useDatabase();
  const tableData = useMemo(() => {
    const data: TableContribuitionsProps["data"] = [];
    console.log(getAuthors());
    getAuthors().forEach((author) => {
      data.push({
        author: author,
        lastModified: getLastUpdateByAuthor(author)!,
        numWords: getWordsAddedByAuthor(author),
        reviews: getAuthorPercentByWordsAdded(author),
      });
    });
    const dataSorted = data.sort((a, b) => {
      if (a.numWords > b.numWords) return -1;
      if (a.numWords < b.numWords) return 1;
      return 0;
    });

    console.log("sorted", dataSorted);

    return dataSorted;
  }, [words]);

  return (
    <>
      <Head>
        <title>Gestor do tradutor Português - Umbundo - Contribuidores</title>
      </Head>

      <Center sx={{ minHeight: "80vh" }}>
        <div>
          <Text align="center" size="xl">
            Contribuidores
          </Text>

          <Box mt={20}>
            <TableContribuitions data={tableData} />
          </Box>

          <Box mt={20}>
            <Text size="sm" align="center" color="dimmed">
              Total de palavras: <b>{words?.length}</b>
            </Text>
          </Box>
          <Box mt={20}>
            <BackLinkButton />
          </Box>
        </div>
      </Center>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = redirectNoLogin;
