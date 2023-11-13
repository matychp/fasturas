import Link from "next/link";
import { Button } from "~/components/ui/button";

interface CreateItemLayoutProps {
  children: React.ReactNode;
}

export default function CreateItemLayout({ children }: CreateItemLayoutProps) {
  return (
    <>
      <div className="flex w-full justify-start">
        <Link href="/items">
          <Button>Back</Button>
        </Link>
      </div>
      <div className="flex h-full flex-grow items-center justify-center">
        {children}
      </div>
    </>
  );
}
