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
import { useEffect } from "react";
import useStatePersist from "../hooks/useStatePersist";
import LocalDatabaseProvider from "../context/DatabaseProvider";
import FirebaseProvider from "../context/FireBaseProvider";
import SimpleNavigation from "../components/SimpleNavigation";
import { RouterTransition } from "../components/RouterTransition";

const databases = {
  development: LocalDatabaseProvider,
  production: FirebaseProvider,
  test: LocalDatabaseProvider,
};

const environment = process.env.NODE_ENV;
// const DatabaseProvider = databases[environment];
const DatabaseProvider = FirebaseProvider;

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

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
        <ColorSchemeContainer>
          <DatabaseProvider>
            <RouterTransition />
            <SimpleNavigation />
            <br />
            <AppProvider Page={<Component {...pageProps} />} />
          </DatabaseProvider>
        </ColorSchemeContainer>
      </AppStore>
    </>
  );
}

function ColorSchemeContainer({ children }: { children: React.ReactNode }) {
  const darkMode = useSelector(selectTheme);
  const dispatch = useDispatch();
  const themeLocal = useStatePersist<boolean>(THEME_KEY_IN_LOCALSTORAGE);

  const toggleColorScheme = (value?: ColorScheme) => {
    dispatch(toggleTheme(null));
  };

  useEffect(() => {
    dispatch(setTheme(themeLocal.get()));
  }, []);

  return (
    <ColorSchemeProvider
      colorScheme={darkMode ? "dark" : "light"}
      toggleColorScheme={toggleColorScheme}
    >
      {children}
    </ColorSchemeProvider>
  );
}
