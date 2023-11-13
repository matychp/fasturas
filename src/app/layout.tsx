import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { SessionProvider } from "~/components/SessionProvider";
import { NavBar } from "~/components/layout/navbar";
import { ThemeProvider } from "~/components/layout/themeProvider";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Fasturas",
  description: "A sad reminder that an adult must pay his bills",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SessionProvider>
              <div className="flex h-screen flex-col items-end justify-start gap-4">
                <NavBar />

                {children}
              </div>
            </SessionProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
