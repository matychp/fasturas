import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/server";
import { ItemRow } from "./item-row";

export default async function Items() {
  const items = await api.item.getItems.query();

  if (items.length === 0) {
    return <div>There are no items.</div>;
  }

  return (
    <Table>
      <TableCaption>A list of your items.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Item</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
        <TableRow></TableRow>
      </TableBody>
    </Table>
  );
}
