import React, { useEffect } from "react";
import { MantineProvider, useMantineColorScheme } from "@mantine/core";
import { GlobalStyles } from "../styles/GlobalStyles";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

interface MantineProviderInterface {
  Page: React.ReactNode;
}

export default function AppProvider({ Page }: MantineProviderInterface) {
  const mantine = useMantineColorScheme();
  const colorScheme = mantine.colorScheme;

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        fontFamily: "Roboto, sans-serif",
        colorScheme,
      }}
    >
      <GlobalStyles mode={colorScheme} />
      <NotificationsProvider>
        <ModalsProvider>{Page}</ModalsProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}
