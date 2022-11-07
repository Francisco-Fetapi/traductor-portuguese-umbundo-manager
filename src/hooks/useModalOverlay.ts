import { useMantineTheme, MantineTransition } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ModalSettings } from "@mantine/modals/lib/context";

export default function useModalOverlay(
  responsive: boolean = false,
  transition: MantineTransition = "fade"
) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 500px)");
  const modalDefaultOptions: Partial<ModalSettings> = {
    overlayColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[9]
        : theme.colors.gray[2],
    overlayOpacity: 0.55,
    overlayBlur: 3,
    fullScreen: responsive === true && isMobile,
    overflow: "inside",
    transition,
    transitionDuration: 300,
  };

  return modalDefaultOptions;
}
