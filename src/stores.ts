import { writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";
import { fusenMinHeight, fusenMinWidth } from "./consts";

export type FusenType = {
  id: string;
  x: number;
  y: number;
  color: string;
  description: string;
};

function createFusenStore() {
  const { subscribe, set, update } = writable<FusenType[]>([]);

  return {
    subscribe,
    set,
    add: (clickX: number, clickY: number) => {
      const x = clickX - fusenMinWidth / 2;
      const y = clickY - fusenMinHeight / 2;

      update((fusens) => [
        ...fusens,
        { id: uuidv4(), x, y, description: "", color: "yellow" },
      ]);
    },
    delete: (id: string) =>
      update((fusens) => fusens.filter((fusen) => fusen.id !== id)),
  };
}

export type FusenStoreType = ReturnType<typeof createFusenStore>;

export const fusenStore: FusenStoreType = createFusenStore();
