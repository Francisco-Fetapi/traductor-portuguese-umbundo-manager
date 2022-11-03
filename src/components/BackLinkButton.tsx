import { Anchor, Box, Center, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import Link from "next/link";
import React from "react";

export default function BackLinkButton() {
  return (
    <Link href="/">
      <Anchor<"a"> color="dimmed" size="sm">
        <Center inline>
          <IconArrowLeft size={12} stroke={1.5} />
          <Box ml={5}>
            <Text size="sm" align="center">
              Voltar
            </Text>
          </Box>
        </Center>
      </Anchor>
    </Link>
  );
}
