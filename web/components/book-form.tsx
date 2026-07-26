"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Genre } from "@/interfaces/Genre";

export interface BookFormState {
  error?: string;
}

export interface BookFormDefaultValues {
  title: string;
  author: string;
  genre: string;
  description: string;
  coverUrl: string;
}

export function BookForm({
  action,
  defaultValues,
  submitLabel,
  pendingLabel,
  genres,
}: {
  action: (
    state: BookFormState,
    formData: FormData,
  ) => Promise<BookFormState>;
  defaultValues?: BookFormDefaultValues;
  submitLabel: string;
  pendingLabel: string;
  genres: Genre[];
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <Card className="max-w-2xl">
      <CardContent>
        <form action={formAction} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                name="title"
                placeholder="Ex.: Dom Casmurro"
                defaultValue={defaultValues?.title}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="author">Autor</Label>
              <Input
                id="author"
                name="author"
                placeholder="Ex.: Machado de Assis"
                defaultValue={defaultValues?.author}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="genre">Gênero</Label>
              <Select
                name="genre"
                required
                defaultValue={defaultValues?.genre}
                items={genres.map((genre) => ({
                  value: genre.name,
                  label: genre.name,
                }))}
              >
                <SelectTrigger id="genre" className="w-full">
                  <SelectValue placeholder="Selecione um gênero" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre.id} value={genre.name}>
                      {genre.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="coverUrl">URL da capa</Label>
              <Input
                id="coverUrl"
                name="coverUrl"
                type="url"
                placeholder="https://..."
                defaultValue={defaultValues?.coverUrl}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Do que se trata o livro?"
              rows={5}
              defaultValue={defaultValues?.description}
              required
            />
          </div>

          {state?.error ? (
            <p
              className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
              role="alert"
            >
              {state.error}
            </p>
          ) : null}

          <div className="flex justify-end border-t border-border pt-4">
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={pending}
            >
              {pending ? pendingLabel : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
