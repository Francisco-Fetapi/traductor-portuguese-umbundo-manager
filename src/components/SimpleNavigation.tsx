import { Anchor, Breadcrumbs, Center, Text } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function SimpleNavigation() {
  return (
    <Center my={5}>
      <Breadcrumbs>
        <PageLink href="/">Nova Palavra</PageLink>
        <PageLink href="/contribuidores">Contribuidores</PageLink>
        <PageLink href="/novo-topico">Novo Tópico</PageLink>
        <PageLink href="/lista-de-topicos">Lista de Tópicos</PageLink>
        <PageLink href="/lista-de-palavras">Lista de palavras</PageLink>
      </Breadcrumbs>
    </Center>
  );
}

interface PageLinkProps {
  href: string;
  children: React.ReactNode;
}

function PageLink({ href, children }: PageLinkProps) {
  const { pathname } = useRouter();
  if (pathname === href) {
    return (
      <Text color="dimmed" size="sm">
        {children}
      </Text>
    );
  }
  return (
    <Link href={href}>
      <Anchor<"a"> size="sm">{children}</Anchor>
    </Link>
  );
}
