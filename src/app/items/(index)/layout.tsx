import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { TypographyH2 } from "~/components/typography/h2";
import { Button } from "~/components/ui/button";

interface ItemsProps {
  children: React.ReactNode;
}

export default function Items({ children }: ItemsProps) {
  return (
    <>
      <div className="flex w-full justify-between">
        <div>
          <TypographyH2>Items</TypographyH2>
        </div>
        <div>
          <Link href="/items/new">
            <Button className="gap-2">
              <PlusIcon />
              <span>Add item</span>
            </Button>
          </Link>
        </div>
      </div>
      {children}
    </>
  );
}
