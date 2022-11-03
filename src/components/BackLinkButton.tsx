import { Anchor, Box, Center, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function BackLinkButton() {
  const router = useRouter();

  return (
    <Anchor<"a">
      color="dimmed"
      size="sm"
      onClick={(e) => {
        e.preventDefault();
        router.back();
      }}
    >
      <Center inline>
        <IconArrowLeft size={12} stroke={1.5} />
        <Box ml={5}>
          <Text size="sm" align="center">
            Voltar
          </Text>
        </Box>
      </Center>
    </Anchor>
  );
}
