import { writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";

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
    add: (x: number, y: number) =>
      update((fusens) => [
        ...fusens,
        { id: uuidv4(), x, y, description: "", color: "yellow" },
      ]),
    delete: (id: string) =>
      update((fusens) => fusens.filter((fusen) => fusen.id !== id)),
  };
}

export type FusenStoreType = ReturnType<typeof createFusenStore>;

export const fusenStore: FusenStoreType = createFusenStore();
