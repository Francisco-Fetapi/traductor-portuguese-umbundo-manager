import { useMantineTheme } from "@mantine/core";

export default function useModalOverlay() {
  const theme = useMantineTheme();
  const modalDefaultOptions = {
    overlayColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[9]
        : theme.colors.gray[2],
    overlayOpacity: 0.55,
    overlayBlur: 3,
  };

  return modalDefaultOptions;
}
