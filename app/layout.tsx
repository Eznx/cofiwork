import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diseño de páginas web para negocios",
  description:
    "Creo páginas web profesionales para negocios y me encargo de todo el proceso, desde el diseño hasta la publicación.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}