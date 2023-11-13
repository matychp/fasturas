import Link from "next/link";
import { Button } from "~/components/ui/button";

interface ItemsProps {
  children: React.ReactNode;
}

export default function Items({ children }: ItemsProps) {
  return (
    <>
      <div className="flex w-full justify-end">
        <Link href="/items/new">
          <Button>Add item</Button>
        </Link>
      </div>
      {children}
    </>
  );
}
