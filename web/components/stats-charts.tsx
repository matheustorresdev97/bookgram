"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PerBookStat {
  id: number;
  title: string;
  genre: string;
  comments: number;
  likes: number;
}

interface GenreDatum {
  genre: string;
  count: number;
}

const engagementConfig = {
  likes: {
    label: "Curtidas",
    color: "var(--chart-1)",
  },
  comments: {
    label: "Comentários",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const genreConfig = {
  count: {
    label: "Livros",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

function truncateTitle(title: string, max = 14) {
  return title.length > max ? `${title.slice(0, max - 1)}…` : title;
}

export function StatsCharts({
  totalBooks,
  totalComments,
  totalLikes,
  genreData,
  perBookStats,
}: {
  totalBooks: number;
  totalComments: number;
  totalLikes: number;
  genreData: GenreDatum[];
  perBookStats: PerBookStat[];
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Livros postados</CardDescription>
            <CardTitle className="text-3xl">{totalBooks}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Curtidas recebidas</CardDescription>
            <CardTitle className="text-3xl">{totalLikes}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Comentários recebidos</CardDescription>
            <CardTitle className="text-3xl">{totalComments}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {perBookStats.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Poste um livro para ver suas estatísticas de engajamento.
        </p>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Curtidas e comentários por livro</CardTitle>
              <CardDescription>
                Engajamento em cada livro que você postou.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={engagementConfig}
                className="max-h-80 w-full"
              >
                <BarChart data={perBookStats} margin={{ left: 0, right: 12 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="title"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value: string) => truncateTitle(value)}
                  />
                  <YAxis
                    allowDecimals={false}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="likes" fill="var(--color-likes)" radius={4} />
                  <Bar
                    dataKey="comments"
                    fill="var(--color-comments)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Livros por gênero</CardTitle>
              <CardDescription>
                Quantidade de livros postados em cada gênero.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={genreConfig} className="max-h-80 w-full">
                <BarChart
                  data={genreData}
                  layout="vertical"
                  margin={{ left: 12 }}
                >
                  <CartesianGrid horizontal={false} />
                  <XAxis
                    type="number"
                    allowDecimals={false}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    dataKey="genre"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    width={90}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
