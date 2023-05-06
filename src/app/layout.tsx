import "./globals.css";
import { Inter } from "next/font/google";

import Providers from "@components/Providers";
import { Menu } from "@components/Menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fitness APP",
  description: "Fitness APP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Menu />
          {children}
        </Providers>
      </body>
    </html>
  );
}
