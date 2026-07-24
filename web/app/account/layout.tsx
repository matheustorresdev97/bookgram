import { AccountNav } from "@/components/account-nav";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <AccountNav />
      {children}
    </main>
  );
}
