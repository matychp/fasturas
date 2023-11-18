"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import debounce from "lodash.debounce";
import { useMemo, useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Skeleton } from "~/components/ui/skeleton";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

interface ItemNamesProps {
  value: string;
  onSelectedChange: (selected: string) => void;
}

export function ItemNames({ value = "", onSelectedChange }: ItemNamesProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [searchOnRequest, setSearchOnRequest] = useState<string>("");
  const itemNames = api.itemNames.getMany.useQuery(
    {
      search: searchOnRequest,
    },
    {
      refetchOnWindowFocus: false,
      initialData: value !== "" ? [{ id: -1, name: value }] : [],
      keepPreviousData: true,
    },
  );

  const debounceSearch = useMemo(
    () => debounce(setSearchOnRequest, 500),
    [setSearchOnRequest],
  );

  if (itemNames.status === "error") {
    return <div>Error...</div>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value !== "" ? value : "Select an item"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command shouldFilter={false}>
          <CommandInput
            className="h-9 w-full"
            value={search}
            onValueChange={(newValue) => {
              setSearch(newValue);
              debounceSearch(newValue);
            }}
            placeholder="Search an item..."
            disabled={itemNames.isFetching}
          />
          {itemNames.isFetching ? (
            <CommandList>
              {[...Array(5).keys()].map((_, index) => (
                <CommandItem key={index}>
                  <Skeleton className="h-6 w-full" />
                </CommandItem>
              ))}
            </CommandList>
          ) : (
            <CommandList>
              <CommandEmpty>No item found.</CommandEmpty>
              <CommandGroup>
                {itemNames.data.map((itemName) => (
                  <CommandItem
                    key={itemName.id}
                    value={itemName.name}
                    onSelect={(selectedValue) => {
                      setOpen(false);
                      if (selectedValue === value) {
                        onSelectedChange("");
                      } else {
                        onSelectedChange(itemName.name);
                      }
                    }}
                  >
                    {itemName.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === itemName.name ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
