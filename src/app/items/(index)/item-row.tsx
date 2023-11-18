"use client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { TableCell, TableRow } from "~/components/ui/table";
import { api, type RouterOutputs } from "~/trpc/react";

type Item = RouterOutputs["item"]["getMany"]["items"][number];

interface ItemRowProps {
  item: Item;
}

export const ItemRow = ({ item }: ItemRowProps) => {
  const router = useRouter();
  const pay = api.item.pay.useMutation();

  const onItemSelected = (itemId: number) => {
    router.push(`/items/${itemId}`);
  };

  const onPay = async (itemId: number) => {
    await pay.mutateAsync({ id: itemId });
    router.refresh();
  };

  return (
    <TableRow key={item.id} onClick={() => onItemSelected(item.id)}>
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
          variant="secondary"
          onClick={async (e) => {
            e.stopPropagation();
            await onPay(item.id);
          }}
          disabled={pay.isLoading || pay.isSuccess || item.status === "paid"}
        >
          <div className="flex items-center gap-2">
            {pay.isLoading ? <span>Paying</span> : <span>Pay</span>}
            {pay.isLoading && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
          </div>
        </Button>
      </TableCell>
    </TableRow>
  );
};
