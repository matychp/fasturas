import { format } from "date-fns";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/server";

const paramsSchema = z.object({
  id: z.string(),
});

type Params = z.infer<typeof paramsSchema>;

interface ItemProps {
  params: Params;
}

export default async function Item({ params }: ItemProps) {
  const { id } = paramsSchema.extend({ id: z.coerce.number() }).parse(params);
  const item = await api.item.getOne.query({
    id,
  });

  if (item === undefined) {
    return <div>Item not found.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Item</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              className="text-center"
              value={item.name}
              readOnly
            />
          </div>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              className="text-right"
              value={new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
              }).format(Number(item.amount))}
              readOnly
            />
          </div>
          <div>
            <Label htmlFor="due">Due</Label>
            <Input
              id="due"
              className="text-center"
              value={format(item.due, "dd/MM/yyyy")}
              readOnly
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
