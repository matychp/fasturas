import { like } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { itemNames } from "~/server/db/schema";

export const itemNamesRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z
        .object({
          search: z.string().nullish(),
        })
        .nullish(),
    )
    .query(({ ctx, input }) => {
      if (input?.search) {
        return ctx.db
          .select()
          .from(itemNames)
          .where(like(itemNames.name, `%${input.search}%`))
          .limit(5);
      }

      return ctx.db.query.itemNames.findMany({
        limit: 5,
      });
    }),
});
