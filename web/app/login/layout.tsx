import Image from "next/image";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid flex-1 grid-cols-1 sm:grid-cols-2">
      <div className="relative hidden sm:block">
        <Image
          src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80"
          alt="Pilha de livros abertos"
          fill
          priority
          className="object-cover"
        />
      </div>
      <main className="flex flex-col justify-center px-6 py-16 sm:px-12">
        <div className="mx-auto w-full max-w-sm">{children}</div>
      </main>
    </div>
  );
}
