"use client";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { TableCell, TableRow } from "~/components/ui/table";
import type { SelectedItem } from "~/server/db/schema";
import { api } from "~/trpc/react";

interface ItemRowProps {
  item: SelectedItem;
}

export const ItemRow = ({ item }: ItemRowProps) => {
  const router = useRouter();
  const pay = api.item.pay.useMutation();

  const onItemSelected = (itemId: number) => {
    router.push(`/items/${itemId}`);
  };

  const onPay = async (itemId: number) => {
    await pay.mutateAsync({ id: itemId });
    revalidatePath(`/items`);
  };

  return (
    <TableRow key={item.id} onClick={() => onItemSelected(item.id)}>
      <TableCell className="font-medium">{item.id}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{format(item.due, "dd/MM/yyyy")}</TableCell>
      <TableCell className="text-right">
        {new Intl.NumberFormat("es-AR", {
          style: "currency",
          currency: "ARS",
        }).format(Number(item.amount))}
      </TableCell>
      <TableCell>{item.status}</TableCell>
      <TableCell className="text-right">
        <Button
          onClick={() => onPay(item.id)}
          disabled={item.status === "paid"}
        >
          Pay
        </Button>
      </TableCell>
    </TableRow>
  );
};
