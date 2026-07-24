import { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UserProvider } from "@/components/user-provider";
import { getCurrentUser } from "@/lib/session";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: "BookGram",
  description: "Social media for book lovers",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html
      lang="pt-br"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body>
        <UserProvider user={user}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex flex-1 flex-col">{children}</div>
            <Footer />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
