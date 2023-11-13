interface ItemsProps {
  children: React.ReactNode;
}

export default function Items({ children }: ItemsProps) {
  return (
    <div className="flex h-full w-full flex-col gap-4 px-8">{children}</div>
  );
}
