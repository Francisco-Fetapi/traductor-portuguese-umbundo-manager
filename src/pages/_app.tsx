import { AppProps } from "next/app";
import Head from "next/head";
import AppStore from "../core/AppStore";
import AppProvider from "../core/AppProvider";
import { ColorScheme, ColorSchemeProvider } from "@mantine/core";
import { useSelector } from "react-redux";
import { selectTheme } from "../store/App.selectors";
import { useDispatch } from "react-redux";
import {
  setTheme,
  THEME_KEY_IN_LOCALSTORAGE,
  toggleTheme,
} from "../store/App.store";
import { useEffect, useState } from "react";
import useStatePersist from "../hooks/useStatePersist";
import LocalDatabaseProvider from "../context/DatabaseProvider";
import FirebaseProvider from "../context/FireBaseProvider";
import SimpleNavigation from "../components/SimpleNavigation";
import { RouterTransition } from "../components/RouterTransition";
import nookies, { setCookie } from "nookies";

const databases = {
  development: LocalDatabaseProvider,
  production: FirebaseProvider,
  test: LocalDatabaseProvider,
};

const environment = process.env.NODE_ENV;
const DatabaseProvider = databases[environment];
// const DatabaseProvider = FirebaseProvider;

type IColorScheme = "light" | "dark";
const THEME_COOKIE = "theme_mantine_dictionary";

export default function App(props: AppProps & { colorScheme: IColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState(props.colorScheme);

  function toggleColorScheme(color: IColorScheme) {
    const nextColor = color || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColor);
    setCookie(null, THEME_COOKIE, nextColor, {
      maxAge: 60 * 60 * 24 * 31,
      path: "/",
    });
  }

  return (
    <>
      <Head>
        <title>Portal Obadias Malaquias - Página Inicial</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="description"
          content="Portal de noticias do colégio Obadias Malaquias, saiba tudo em primeiro mão."
        />
      </Head>

      <AppStore>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <DatabaseProvider>
            <RouterTransition />
            <SimpleNavigation />
            <br />
            <AppProvider Page={<Component {...pageProps} />} />
          </DatabaseProvider>
        </ColorSchemeProvider>
      </AppStore>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: any }) => {
  const cookies = nookies.get(ctx);
  return {
    colorScheme: cookies[THEME_COOKIE] || "light",
  };
};
