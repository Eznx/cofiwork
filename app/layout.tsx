import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "COFIWORK — Experiencias digitales con identidad propia",
  description:
    "Estrategia, identidad, tecnología e interacción para crear experiencias digitales que le dan a cada marca una razón clara para ser elegida.",
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
