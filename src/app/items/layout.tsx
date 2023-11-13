import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";

interface ItemsProps {
  children: React.ReactNode;
}

export default async function Items({ children }: ItemsProps) {
  const session = await getServerAuthSession();

  if (session === null) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex h-full w-full flex-col gap-4 px-8">{children}</div>
  );
}
