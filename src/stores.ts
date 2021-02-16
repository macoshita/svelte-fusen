import { writable } from "svelte/store";

export type FusenType = {
  id: string;
  x: number;
  y: number;
  description: string;
};

export const fusens = writable<FusenType[]>([]);
