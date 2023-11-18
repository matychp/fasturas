"use client";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { CurrencyInput } from "~/components/ui/currency-input";
import { DatePicker } from "~/components/ui/date-picker";
import { api } from "~/trpc/react";
import { ItemNames } from "./ItemNames";

const searchParamsSchema = z.object({
  name: z.string().catch(""),
  amount: z.string().catch("0"),
  due: z.string().default(new Date().toISOString()),
});

type SearchParams = z.infer<typeof searchParamsSchema>;

interface CreateItemProps {
  searchParams: SearchParams;
}

export default function CreateItem({ searchParams }: CreateItemProps) {
  const { amount, due, name } = searchParamsSchema.parse(searchParams);
  const router = useRouter();

  const updateURLSearchParams = (input: SearchParams) => {
    const newSearchParams = new URLSearchParams(input);

    router.replace(`/items/new?${newSearchParams}`);
  };

  const createItem = api.item.create.useMutation({
    onSuccess: () => {
      router.replace("/items");
    },
  });

  const onSaveClicked = async () => {
    await createItem.mutateAsync({
      name,
      amount,
      due,
    });
    router.refresh();
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Add item</CardTitle>
        </CardHeader>
        <CardContent>
          <ItemNames
            value={name}
            onSelectedChange={(newSelected) => {
              updateURLSearchParams({
                name: newSelected,
                amount,
                due,
              });
            }}
          />
          <CurrencyInput
            amount={Number(amount)}
            onAmountChange={(newAmount) =>
              updateURLSearchParams({
                name,
                amount: String(newAmount),
                due,
              })
            }
          />
          <DatePicker
            date={new Date(due)}
            onSelectedDate={(newDue) =>
              updateURLSearchParams({
                name,
                amount,
                due: newDue.toISOString(),
              })
            }
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={onSaveClicked} disabled={createItem.isLoading}>
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
