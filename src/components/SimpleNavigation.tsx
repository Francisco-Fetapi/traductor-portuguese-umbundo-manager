import { Anchor, Breadcrumbs, Center, Text } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function SimpleNavigation() {
  const { pathname } = useRouter();
  const links = [
    { url: "/", label: "Nova Palavra" },
    { url: "/lista-de-palavras", label: "Lista de Palavras" },
    { url: "/lista-de-topicos", label: "Lista de Topicos" },
    // { url: "/contribuidores", label: "Contribuidores" },
  ];
  return (
    <Center my={5} sx={{ zoom: 0.9 }}>
      <Breadcrumbs>
        {links
          .filter((link) => link.url !== pathname)
          .map((link) => (
            <PageLink key={link.url} href={link.url}>
              {link.label}
            </PageLink>
          ))}
      </Breadcrumbs>
    </Center>
  );
}
interface PageLinkProps {
  href: string;
  children: React.ReactNode;
}

function PageLink({ href, children }: PageLinkProps) {
  return (
    <Link href={href}>
      <Anchor<"a"> size="sm">{children}</Anchor>
    </Link>
  );
}
