import { asc, eq, sql } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { insertItem, itemNames, items } from "~/server/db/schema";

export const itemsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object(insertItem.shape))
    .mutation(async ({ ctx, input }) => {
      const values = insertItem.extend({ due: z.coerce.date() }).parse(input);

      const itemName = await ctx.db
        .select({ id: itemNames.id })
        .from(itemNames)
        .where(eq(itemNames.name, values.name));

      if (itemName.length === 0) {
        throw new Error("Item name not found");
      } else {
        return await ctx.db.insert(items).values({
          ...values,
          userId: ctx.session.user.id,
          nameId: itemName[0]!.id,
        });
      }
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.number() }))
    .output(
      z
        .object({ name: z.string(), due: z.date(), amount: z.string() })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const item = await ctx.db
        .select({
          name: itemNames.name,
          due: items.due,
          amount: items.amount,
        })
        .from(items)
        .innerJoin(itemNames, eq(items.nameId, itemNames.id))
        .where(eq(items.id, input.id))
        .limit(1);

      return item[0];
    }),
  getMany: protectedProcedure
    .input(z.object({ page: z.number().catch(0) }).catch({ page: 0 }))
    .query(async ({ ctx, input }) => {
      const count = await ctx.db
        .select({
          count: sql<string>`count(${items.id})`,
        })
        .from(items)
        .groupBy(items.id);

      const returnedItems = await ctx.db
        .select({
          id: items.id,
          due: items.due,
          amount: items.amount,
          status: items.status,
          name: itemNames.name,
        })
        .from(items)
        .orderBy(asc(items.due))
        .innerJoin(itemNames, eq(items.nameId, itemNames.id))
        .where(eq(items.userId, ctx.session.user.id))
        .limit(5)
        .offset(input.page * 5);

      return {
        count: count.length,
        items: returnedItems,
      };
    }),
  pay: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(items)
        .set({
          status: "paid",
        })
        .where(eq(items.id, input.id));
    }),
});
