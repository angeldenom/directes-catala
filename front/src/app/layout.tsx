import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/modeToggle"

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
      <body className={inter.className}>
        <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
            <nav className="flex justify-between">
              <h1 className="ml-4">Directes en català</h1>
              <div className="mr-4 ml-2"><ModeToggle /></div>
            </nav>
            {children}
            <footer className="max-w-6xl mx-auto my-12">
              <div className="flex items-center justify-center mb-6">
              <p>2024 Directes en català</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
    </html>
  );
}
