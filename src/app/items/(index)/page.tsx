import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/server";
import { ItemRow } from "./item-row";

const searchParamsSchema = z.object({
  page: z.coerce.number().min(0).catch(0),
});

type SearchParams = z.infer<typeof searchParamsSchema>;

interface ItemsProps {
  searchParams: SearchParams;
}

export default async function Items({ searchParams }: ItemsProps) {
  const { page } = searchParamsSchema.parse(searchParams);

  const { count, items } = await api.item.getMany.query({
    page,
  });
  const totalPages = Math.floor(count / 5);

  if (items.length === 0) {
    return <div>There are no items.</div>;
  }

  return (
    <>
      <div className="h-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="my-8 flex items-center justify-center gap-4">
        <Link
          href={{
            pathname: "/items",
            query: { page: 0 },
          }}
        >
          <Button disabled={page === 0}>
            <DoubleArrowLeftIcon />
          </Button>
        </Link>
        <Link
          href={{
            pathname: "/items",
            query: { page: page - 1 },
          }}
        >
          <Button disabled={page === 0}>
            <ChevronLeftIcon />
          </Button>
        </Link>
        <div className="flex h-10 w-10 items-center justify-center rounded border">
          {page}
        </div>
        <Link
          href={{
            pathname: "/items",
            query: { page: page + 1 },
          }}
        >
          <Button disabled={page === totalPages}>
            <ChevronRightIcon />
          </Button>
        </Link>
        <Link
          href={{
            pathname: "/items",
            query: { page: totalPages },
          }}
        >
          <Button disabled={page === totalPages}>
            <DoubleArrowRightIcon />
          </Button>
        </Link>
      </div>
    </>
  );
}
