"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
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
    <form action={formAction} className="flex max-w-md flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          name="title"
          defaultValue={defaultValues?.title}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="author">Autor</Label>
        <Input
          id="author"
          name="author"
          defaultValue={defaultValues?.author}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="genre">Gênero</Label>
        <Select
          name="genre"
          required
          defaultValue={defaultValues?.genre}
          items={genres.map((genre) => ({ value: genre.name, label: genre.name }))}
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
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={defaultValues?.description}
          required
        />
      </div>

      {state?.error ? (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" className="mt-2" disabled={pending}>
        {pending ? pendingLabel : submitLabel}
      </Button>
    </form>
  );
}
