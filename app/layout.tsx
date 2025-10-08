import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";

const comfortaa = Comfortaa({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Viajes Dashboard",
    default: "Viajes Dashboard"
  },
  description: "Dashboard para ver y administrar viajes y mantenimiento de camiones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${comfortaa.className} antialiased overflow-x-hidden w-full`}
      >
        {children}
      </body>
    </html>
  );
}
