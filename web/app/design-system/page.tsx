import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const buttonVariantList = [
  "default",
  "outline",
  "secondary",
  "ghost",
  "destructive",
  "link",
] as const;

const buttonSizes = ["sm", "default", "lg"] as const;

const swatches = [
  { token: "background", label: "Background" },
  { token: "foreground", label: "Foreground" },
  { token: "card", label: "Card" },
  { token: "primary", label: "Primary" },
  { token: "secondary", label: "Secondary" },
  { token: "muted", label: "Muted" },
  { token: "accent", label: "Accent" },
  { token: "destructive", label: "Destructive" },
  { token: "border", label: "Border" },
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 border-b border-border pb-10">
      <h2 className="text-2xl">{title}</h2>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Books · Design System</p>
        <h1 className="text-4xl">Vitrine de componentes</h1>
        <p className="text-muted-foreground">
          Tipografia, paleta de cores e primeiros componentes de UI.
        </p>
      </header>

      <Section title="Tipografia">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl">Título h1 em Fraunces</h1>
          <h2 className="text-3xl">Título h2 em Fraunces</h2>
          <h3 className="text-2xl">Título h3 em Fraunces</h3>
          <p className="max-w-prose text-base">
            Parágrafo em Inter. O corpo do texto usa a fonte sans-serif para
            garantir boa legibilidade em blocos longos de conteúdo, como
            sinopses e descrições de livros.
          </p>
          <p className="text-sm text-muted-foreground">
            Texto pequeno / muted, para metadados como autor, ano ou gênero.
          </p>
        </div>
      </Section>

      <Section title="Paleta de cores">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-3">
          {swatches.map((swatch) => (
            <div key={swatch.token} className="flex flex-col gap-2">
              <div
                className="h-16 rounded-lg border border-border"
                style={{ backgroundColor: `var(--${swatch.token})` }}
              />
              <span className="text-sm text-muted-foreground">
                {swatch.label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Button">
        <div className="flex flex-col gap-4">
          {buttonSizes.map((size) => (
            <div key={size} className="flex flex-wrap items-center gap-3">
              <span className="w-16 text-sm text-muted-foreground">
                {size}
              </span>
              {buttonVariantList.map((variant) => (
                <Button key={variant} variant={variant} size={size}>
                  {variant}
                </Button>
              ))}
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-3">
            <span className="w-16 text-sm text-muted-foreground">
              disabled
            </span>
            <Button disabled>default</Button>
            <Button variant="outline" disabled>
              outline
            </Button>
          </div>
        </div>
      </Section>

      <Section title="Input">
        <div className="flex max-w-sm flex-col gap-3">
          <Input placeholder="Buscar por título ou autor" />
          <Input placeholder="Desabilitado" disabled />
        </div>
      </Section>
    </main>
  );
}
