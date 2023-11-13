"use client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { TableCell, TableRow } from "~/components/ui/table";

interface ItemRowProps {
  item: {
    id: number;
    name: string;
    due: Date;
    amount: string;
  };
}

export const ItemRow = ({ item }: ItemRowProps) => {
  const router = useRouter();

  const onItemSelected = (itemId: number) => {
    router.push(`/items/${itemId}`);
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
    </TableRow>
  );
};
