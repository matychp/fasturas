import { itemsRouter } from "~/server/api/routers/items";
import { createTRPCRouter } from "~/server/api/trpc";
import { itemNamesRouter } from "./routers/itemsNames";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  item: itemsRouter,
  itemNames: itemNamesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
