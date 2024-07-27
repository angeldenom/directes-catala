import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/modeToggle"
import Script from "next/script";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Directes en català",
  description: "El portal dels directes en català.",
  metadataBase: new URL('https://twitch.cat'),
  keywords: ["twitch en català", 'directes', 'twitch', 'català', 'Catalunya', "creadors catalans"],
  openGraph: {
    title: "Directes en català",
    description: "El portal dels directes en català.",
    locale: "ca_ES",
  },
  twitter: {
    title: "Directes en català",
    description: "El portal dels directes en català.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cloud.umami.is/script.js" 
          strategy="beforeInteractive"
          data-website-id="95089e77-68e0-404d-bf4e-dbb92c9d4185" 
          defer
        />
      </head>     
      <body className={inter.className}>
        <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
            <nav className="flex justify-between">
              <Link href="/"><h1 className="ml-4">Directes en català</h1></Link>
              <div className="mr-4 ml-2"><ModeToggle /></div>
            </nav>
            {children}
            <footer className="max-w-6xl mx-auto my-12">
              <div className="flex flex-col items-center justify-center mb-6">
                <Link href="/missió">Missió</Link>
                <Link href="/codi-obert">Codi Obert</Link>
                <Link href="https://cloud.umami.is/share/qF9e14VJ27SQRnMw/twitch.cat">Estadístiques</Link>
                <Link href="/contacte">Contacte</Link>
              </div>
            </footer>
          </ThemeProvider>
        </body>
    </html>
  );
}
