import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function useModalOverlay(responsive: boolean = false) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 500px)");
  const modalDefaultOptions = {
    overlayColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[9]
        : theme.colors.gray[2],
    overlayOpacity: 0.55,
    overlayBlur: 3,
    fullScreen: responsive === true && isMobile,
    overflow: "inside" as "outside" | "inside",
  };

  return modalDefaultOptions;
}
