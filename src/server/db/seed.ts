import { sql } from "drizzle-orm";
import { db } from "~/server/db";
import { itemNames } from "~/server/db/schema";

await db
  .insert(itemNames)
  .values([
    {
      name: "EPEC",
    },
    {
      name: "Aguas Cordobesas",
    },
    {
      name: "Ecogas",
    },
    {
      name: "Personal Línea Móvil",
    },
    {
      name: "Swiss Medical",
    },
    {
      name: "Netflix",
    },
    {
      name: "Prime Video",
    },
    {
      name: "Youtube Premium",
    },
    {
      name: "Mercado Libre Nivel 6",
    },
    {
      name: "Google One",
    },
    {
      name: "Xbox Game Pass",
    },
    {
      name: "Discord Nitro",
    },
    {
      name: "AFIP Monotributo",
    },
    {
      name: "GitHub Copilot",
    },
    {
      name: "HBO",
    },
    {
      name: "Star+",
    },
    {
      name: "Disney+",
    },
    {
      name: "Toyota Plan de Ahorro",
    },
  ])
  .onDuplicateKeyUpdate({ set: { name: sql`name` } });
