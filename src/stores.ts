import { writable } from "svelte/store";

export type FusenType = {
  id: string;
  x: number;
  y: number;
  color: string;
  description: string;
};

export const fusenStore = writable<FusenType[]>([]);
