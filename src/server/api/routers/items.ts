import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { insertItem, items } from "~/server/db/schema";

export const itemsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object(insertItem.shape))
    .mutation(async ({ ctx, input }) => {
      const values = insertItem.extend({ due: z.coerce.date() }).parse(input);

      await ctx.db.insert(items).values({
        ...values,
        userId: ctx.session.user.id,
      });
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.items.findFirst({
        where: eq(items.id, input.id),
      });
    }),
  getItems: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.items.findMany({
      orderBy: (items, { desc }) => [desc(items.createdAt)],
      where: eq(items.userId, ctx.session.user.id),
    });
  }),
});
